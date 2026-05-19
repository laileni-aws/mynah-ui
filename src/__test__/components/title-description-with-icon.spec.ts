/*!
 * Copyright 2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TitleDescriptionWithIcon } from '../../components/title-description-with-icon';
import { MynahIcons } from '../../components/icon';

describe('TitleDescriptionWithIcon Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Legacy layout (no centered prop)', () => {
    it('renders with the original wrapper class only when an icon is provided or centered is true', () => {
      const withIcon = new TitleDescriptionWithIcon({
        icon: MynahIcons.Q,
        title: 'Hi',
      });
      expect(withIcon.render.classList.contains('mynah-ui-title-description-icon-wrapper')).toBe(true);
      expect(withIcon.render.classList.contains('mynah-ui-title-description-icon-wrapper-centered')).toBe(false);

      const centeredOnly = new TitleDescriptionWithIcon({ title: 'Hi', centered: true });
      expect(centeredOnly.render.classList.contains('mynah-ui-title-description-icon-wrapper')).toBe(true);
      expect(centeredOnly.render.classList.contains('mynah-ui-title-description-icon-wrapper-centered')).toBe(true);

      const plain = new TitleDescriptionWithIcon({ title: 'Hi' });
      expect(plain.render.classList.contains('mynah-ui-title-description-icon-wrapper')).toBe(false);
    });

    it('does not render a tip block when tip prop is omitted', () => {
      const component = new TitleDescriptionWithIcon({
        icon: MynahIcons.Q,
        title: 'Title',
        description: 'Description',
      });
      expect(component.render.querySelector('.mynah-ui-title-description-icon-tip')).toBeNull();
    });
  });

  describe('Centered layout', () => {
    it('adds the centered modifier class when centered is true', () => {
      const component = new TitleDescriptionWithIcon({
        icon: MynahIcons.Q,
        title: 'Amazon Q',
        centered: true,
      });
      expect(component.render.classList.contains('mynah-ui-title-description-icon-wrapper-centered')).toBe(true);
    });

    it('omits the centered modifier when centered is false or unset', () => {
      const a = new TitleDescriptionWithIcon({ icon: MynahIcons.Q, title: 'Amazon Q' });
      const b = new TitleDescriptionWithIcon({ icon: MynahIcons.Q, title: 'Amazon Q', centered: false });
      expect(a.render.classList.contains('mynah-ui-title-description-icon-wrapper-centered')).toBe(false);
      expect(b.render.classList.contains('mynah-ui-title-description-icon-wrapper-centered')).toBe(false);
    });
  });

  describe('Tip card', () => {
    it('renders a tip block with title and body when tip is provided', () => {
      const component = new TitleDescriptionWithIcon({
        icon: MynahIcons.Q,
        title: 'Amazon Q',
        tip: { title: 'Did you know?', body: 'Pinned context is always included' },
        description: 'Select code & ask',
        centered: true,
      });
      const tip = component.render.querySelector('.mynah-ui-title-description-icon-tip');
      expect(tip).not.toBeNull();
      expect(tip?.querySelector('.mynah-ui-title-description-icon-tip-title')?.textContent).toBe('Did you know?');
      expect(tip?.querySelector('.mynah-ui-title-description-icon-tip-body')?.textContent).toBe('Pinned context is always included');
    });

    it('renders only the parts of the tip that are provided', () => {
      const onlyBody = new TitleDescriptionWithIcon({
        title: 'Amazon Q',
        tip: { body: 'Just a body' },
      });
      expect(onlyBody.render.querySelector('.mynah-ui-title-description-icon-tip-title')).toBeNull();
      expect(onlyBody.render.querySelector('.mynah-ui-title-description-icon-tip-body')?.textContent).toBe('Just a body');
    });

    it('places the tip between title and description in the DOM', () => {
      const component = new TitleDescriptionWithIcon({
        icon: MynahIcons.Q,
        title: 'Amazon Q',
        tip: { title: 'Did you know?', body: 'A tip' },
        description: 'Select code & ask',
      });
      const children = Array.from(component.render.children);
      const titleIndex = children.findIndex(c => c.classList.contains('mynah-ui-title-description-icon-title'));
      const tipIndex = children.findIndex(c => c.classList.contains('mynah-ui-title-description-icon-tip'));
      const descIndex = children.findIndex(c => c.classList.contains('mynah-ui-title-description-icon-description'));
      expect(titleIndex).toBeGreaterThanOrEqual(0);
      expect(tipIndex).toBeGreaterThan(titleIndex);
      expect(descIndex).toBeGreaterThan(tipIndex);
    });
  });
});
