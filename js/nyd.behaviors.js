/**
 * @file
 * NydCSS Theme — Drupal behaviors
 *
 * - Mobile navigation toggle
 * - Sticky header scroll class
 * - Keyboard-accessible dropdown menus
 * - Hero scroll parallax (subtle)
 */

(function (Drupal, once) {
  'use strict';

  // ────────────────────────────────────────────────────────────────────────────
  // 1. Mobile Menu Toggle
  // ────────────────────────────────────────────────────────────────────────────

  Drupal.behaviors.nydMobileMenu = {
    attach: function (context) {
      once('nyd-mobile-menu', '.site-header__menu-toggle', context).forEach(function (toggle) {
        const navId  = toggle.getAttribute('aria-controls');
        const mobileNav = navId ? document.getElementById(navId) : null;
        const header = document.querySelector('.site-header');

        if (!mobileNav) return;

        toggle.addEventListener('click', function () {
          const expanded = toggle.getAttribute('aria-expanded') === 'true';
          toggle.setAttribute('aria-expanded', String(!expanded));
          mobileNav.classList.toggle('is-open', !expanded);

          // Prevent body scroll when drawer is open
          document.body.style.overflow = !expanded ? 'hidden' : '';
        });

        // Close on Escape
        document.addEventListener('keydown', function (e) {
          if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
            toggle.setAttribute('aria-expanded', 'false');
            mobileNav.classList.remove('is-open');
            document.body.style.overflow = '';
            toggle.focus();
          }
        });

        // Close when a nav link is clicked
        mobileNav.querySelectorAll('a').forEach(function (link) {
          link.addEventListener('click', function () {
            toggle.setAttribute('aria-expanded', 'false');
            mobileNav.classList.remove('is-open');
            document.body.style.overflow = '';
          });
        });

        // Close on outside click
        document.addEventListener('click', function (e) {
          if (
            mobileNav.classList.contains('is-open') &&
            !toggle.contains(e.target) &&
            !mobileNav.contains(e.target)
          ) {
            toggle.setAttribute('aria-expanded', 'false');
            mobileNav.classList.remove('is-open');
            document.body.style.overflow = '';
          }
        });
      });
    }
  };

  // ────────────────────────────────────────────────────────────────────────────
  // 2. Sticky header — add .scrolled class for enhanced shadow
  // ────────────────────────────────────────────────────────────────────────────

  Drupal.behaviors.nydStickyHeader = {
    attach: function (context) {
      once('nyd-sticky-header', '.site-header', context).forEach(function (header) {
        const onScroll = function () {
          header.classList.toggle('scrolled', window.scrollY > 8);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // run once on attach
      });
    }
  };

  // ────────────────────────────────────────────────────────────────────────────
  // 3. Keyboard-accessible dropdowns in site-nav
  // ────────────────────────────────────────────────────────────────────────────

  Drupal.behaviors.nydDropdowns = {
    attach: function (context) {
      once('nyd-dropdowns', '.site-nav li', context).forEach(function (li) {
        const submenu = li.querySelector('ul');
        if (!submenu) return;

        const toggle = li.querySelector('a');
        if (!toggle) return;

        // Set ARIA on the parent link
        toggle.setAttribute('aria-haspopup', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        submenu.setAttribute('role', 'menu');

        li.addEventListener('mouseenter', () => toggle.setAttribute('aria-expanded', 'true'));
        li.addEventListener('mouseleave', () => toggle.setAttribute('aria-expanded', 'false'));

        toggle.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!expanded));
            if (!expanded) {
              const firstItem = submenu.querySelector('a');
              if (firstItem) firstItem.focus();
            }
          }
          if (e.key === 'Escape') {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.focus();
          }
        });
      });
    }
  };

  // ────────────────────────────────────────────────────────────────────────────
  // 4. Smooth anchor scroll (respects prefers-reduced-motion via CSS)
  // ────────────────────────────────────────────────────────────────────────────

  Drupal.behaviors.nydSmoothScroll = {
    attach: function (context) {
      once('nyd-smooth-scroll', 'a[href^="#"]', context).forEach(function (link) {
        link.addEventListener('click', function (e) {
          const target = document.querySelector(link.getAttribute('href'));
          if (target) {
            e.preventDefault();
            const headerHeight = parseInt(
              getComputedStyle(document.documentElement).getPropertyValue('--nyd-header-height') || '64'
            );
            const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
            window.scrollTo({ top: top, behavior: 'smooth' });
          }
        });
      });
    }
  };

  // ────────────────────────────────────────────────────────────────────────────
  // 5. Dismiss-able messages
  // ────────────────────────────────────────────────────────────────────────────

  Drupal.behaviors.nydDismissMessages = {
    attach: function (context) {
      once('nyd-dismiss', '.messages__close', context).forEach(function (btn) {
        btn.addEventListener('click', function () {
          const msg = btn.closest('.messages');
          if (msg) {
            msg.style.transition = 'opacity 200ms ease, transform 200ms ease, max-height 300ms ease';
            msg.style.opacity = '0';
            msg.style.transform = 'translateY(-4px)';
            setTimeout(function () { msg.remove(); }, 300);
          }
        });
      });
    }
  };

  // ────────────────────────────────────────────────────────────────────────────
  // 6. Theme toggle (data-theme="dark" / "light") — optional
  // ────────────────────────────────────────────────────────────────────────────

  Drupal.behaviors.nydThemeToggle = {
    attach: function (context) {
      once('nyd-theme-toggle', '[data-nyd-theme-toggle]', context).forEach(function (btn) {
        const stored = localStorage.getItem('nyd-theme');
        if (stored) document.documentElement.setAttribute('data-theme', stored);

        btn.addEventListener('click', function () {
          const current = document.documentElement.getAttribute('data-theme');
          const next = current === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', next);
          localStorage.setItem('nyd-theme', next);
          btn.setAttribute('aria-label', 'Switch to ' + (next === 'dark' ? 'light' : 'dark') + ' mode');
        });
      });
    }
  };

})(Drupal, once);
