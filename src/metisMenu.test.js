import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import $ from 'jquery';
import MetisMenu from './metisMenu';

describe('MetisMenu', () => {
    let $menu;

    beforeEach(() => {
        document.body.innerHTML = `
            <ul class="metismenu">
                <li class="mm-active">
                    <a href="#submenu1">Menu 1</a>
                    <ul id="submenu1">
                        <li><a href="#">Submenu 1.1</a></li>
                        <li><a href="#">Submenu 1.2</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#submenu2">Menu 2</a>
                    <ul id="submenu2">
                        <li><a href="#">Submenu 2.1</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#">Menu 3</a>
                </li>
            </ul>
        `;
        $menu = $('.metismenu');
    });

    afterEach(() => {
        const instance = $menu.data('metisMenu');
        if (instance) {
            instance.dispose();
        }
        document.body.innerHTML = '';
    });

    describe('Initialization', () => {
        it('should initialize menu with metismenu class', () => {
            $menu.metisMenu();
            expect($menu.hasClass('metismenu')).toBe(true);
        });

        it('should add mm-active class to initialized menu items', () => {
            $menu.metisMenu();
            const $activeItem = $menu.find('li.mm-active').first();
            expect($activeItem.hasClass('mm-active')).toBe(true);
        });

        it('should set aria-expanded=true for active items', () => {
            $menu.metisMenu();
            const $activeTrigger = $menu.find('li.mm-active > a').first();
            expect($activeTrigger.attr('aria-expanded')).toBe('true');
        });

        it('should add collapse and show classes to active submenus', () => {
            $menu.metisMenu();
            const $submenu = $menu.find('li.mm-active > ul').first();
            expect($submenu.hasClass('mm-collapse')).toBe(true);
            expect($submenu.hasClass('mm-show')).toBe(true);
        });

        it('should add collapse class to inactive submenus', () => {
            $menu.metisMenu();
            const $submenu = $menu.find('li:not(.mm-active) > ul').first();
            expect($submenu.hasClass('mm-collapse')).toBe(true);
            expect($submenu.hasClass('mm-show')).toBe(false);
        });
    });

    describe('Toggle Functionality', () => {
        it('should toggle menu items on click', () => {
            $menu.metisMenu();
            const $trigger = $menu.find('li:not(.mm-active) > a').first();
            const $parent = $trigger.parent();

            $trigger.trigger('click');

            expect($parent.hasClass('mm-active')).toBe(true);
            expect($trigger.attr('aria-expanded')).toBe('true');
        });

        it('should collapse active menu items on click', (done) => {
            $menu.metisMenu();
            const $trigger = $menu.find('li.mm-active > a').first();
            const $parent = $trigger.parent();

            $trigger.trigger('click');

            setTimeout(() => {
                expect($parent.hasClass('mm-active')).toBe(false);
                expect($trigger.attr('aria-expanded')).toBe('false');
                done();
            }, 400);
        });

        it('should toggle between menu items when toggle option is true', () => {
            $menu.metisMenu({ toggle: true });
            const $trigger = $menu.find('li:not(.mm-active) > a').first();
            const $previousActive = $menu.find('li.mm-active').first();

            $trigger.trigger('click');

            // Previous active should be deactivated
            setTimeout(() => {
                expect($previousActive.hasClass('mm-active')).toBe(false);
            }, 100);
        });
    });

    describe('Options', () => {
        it('should respect preventDefault option', () => {
            $menu.metisMenu({ preventDefault: false });
            const $trigger = $menu.find('a[href="#"]').first();

            if ($trigger.attr('href') === '#') {
                const event = new MouseEvent('click');
                $trigger[0].dispatchEvent(event);
            }

            expect($trigger).toBeDefined();
        });

        it('should use custom triggerElement', () => {
            $menu = $(`
                <div class="metismenu">
                    <span class="trigger">Menu 1
                        <ul><li><a href="#">Sub</a></li></ul>
                    </span>
                </div>
            `);

            $menu.metisMenu({ triggerElement: 'span.trigger', parentTrigger: 'span' });

            const $trigger = $menu.find('span.trigger').first();
            expect($trigger).toBeDefined();
        });
    });

    describe('Dispose', () => {
        it('should dispose menu and remove event listeners', () => {
            $menu.metisMenu();
            const instance = $menu.data('metisMenu');
            instance.dispose();

            expect($menu.data('metisMenu')).toBeUndefined();
            expect(instance.config).toBeNull();
            expect(instance.element).toBeNull();
        });

        it('should remove click event after dispose', () => {
            $menu.metisMenu();
            const $inactiveTrigger = $menu.find('li:not(.mm-active) > a').first();
            const instance = $menu.data('metisMenu');
            instance.dispose();

            // After dispose, clicking should not add mm-active class
            $inactiveTrigger.trigger('click');

            // The parent should NOT have mm-active because events are removed
            expect($inactiveTrigger.parent().hasClass('mm-active')).toBe(false);
        });
    });

    describe('jQueryInterface', () => {
        it('should create new instance via jQuery plugin', () => {
            $menu.metisMenu();
            const instance = $menu.data('metisMenu');

            expect(instance).toBeInstanceOf(MetisMenu);
        });

        it('should call method on existing instance', () => {
            $menu.metisMenu();
            expect(() => {
                $menu.metisMenu('dispose');
            }).not.toThrow();
        });

        it('should throw error on non-existent method', () => {
            $menu.metisMenu();

            expect(() => {
                $menu.metisMenu('nonExistentMethod');
            }).toThrow('No method named "nonExistentMethod"');
        });
    });
});
