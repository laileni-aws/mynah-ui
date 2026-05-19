/*!
 * Copyright 2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// eslint-disable @typescript-eslint/restrict-template-expressions
import { DomBuilder, DomBuilderObject, ExtendedHTMLElement } from '../helper/dom';
import { StyleLoader } from '../helper/style-loader';
import { Icon, MynahIcons, MynahIconsType } from './icon';

export interface TitleDescriptionWithIconTip {
  title?: string | ExtendedHTMLElement | HTMLElement | DomBuilderObject;
  body?: string | ExtendedHTMLElement | HTMLElement | DomBuilderObject;
}

interface TitleDescriptionWithIconProps {
  title?: string | ExtendedHTMLElement | HTMLElement | DomBuilderObject;
  description?: string | ExtendedHTMLElement | HTMLElement | DomBuilderObject;
  icon?: MynahIcons | MynahIconsType;
  /**
   * Optional tip card rendered between the title and the description.
   * Useful for "Did you know?"-style introductions on welcome surfaces.
   */
  tip?: TitleDescriptionWithIconTip;
  /**
   * When true, lays out icon, title, tip and description in a single
   * centered column instead of the default `icon | title` two-column grid.
   * Existing consumers get the original layout when this is not set.
   */
  centered?: boolean;
  testId?: string;
  classNames?: string[];
}
export class TitleDescriptionWithIcon {
  render: ExtendedHTMLElement;
  private readonly props: TitleDescriptionWithIconProps;
  constructor (props: TitleDescriptionWithIconProps) {
    StyleLoader.getInstance().load('components/_title-description-icon.scss');
    this.props = props;
    this.render = DomBuilder.getInstance().build({
      type: 'div',
      testId: props.testId,
      // Apply the wrapper styles when the layout depends on them: when an
      // icon needs to be positioned next to the title, or when the centered
      // variant is requested. Existing callers that pass only a title or
      // description without an icon keep their original simple <div> output.
      classNames: [
        ...(this.props.icon !== undefined || this.props.centered === true
          ? [ 'mynah-ui-title-description-icon-wrapper' ]
          : []),
        ...(this.props.centered === true ? [ 'mynah-ui-title-description-icon-wrapper-centered' ] : []),
        ...(this.props.classNames ?? [])
      ],
      children: [
        ...(this.props.icon !== undefined
          ? [ {
              type: 'div',
              testId: `${props.testId ?? ''}-icon`,
              classNames: [ 'mynah-ui-title-description-icon-icon' ],
              children: [ new Icon({
                icon: this.props.icon
              }).render ]
            } ]
          : []),
        ...(this.props.title !== undefined
          ? [ {
              type: 'div',
              testId: `${props.testId ?? ''}-title`,
              classNames: [ 'mynah-ui-title-description-icon-title' ],
              children: [ this.props.title ]
            } ]
          : []),
        ...(this.props.tip !== undefined
          ? [ {
              type: 'div',
              testId: `${props.testId ?? ''}-tip`,
              classNames: [ 'mynah-ui-title-description-icon-tip' ],
              children: [
                ...(this.props.tip.title !== undefined
                  ? [ {
                      type: 'div',
                      testId: `${props.testId ?? ''}-tip-title`,
                      classNames: [ 'mynah-ui-title-description-icon-tip-title' ],
                      children: [ this.props.tip.title ]
                    } ]
                  : []),
                ...(this.props.tip.body !== undefined
                  ? [ {
                      type: 'div',
                      testId: `${props.testId ?? ''}-tip-body`,
                      classNames: [ 'mynah-ui-title-description-icon-tip-body' ],
                      children: [ this.props.tip.body ]
                    } ]
                  : [])
              ]
            } ]
          : []),
        ...(this.props.description !== undefined
          ? [ {
              type: 'div',
              testId: `${props.testId ?? ''}-description`,
              classNames: [ 'mynah-ui-title-description-icon-description' ],
              children: [ this.props.description ]
            } ]
          : [])
      ]
    });
  }
}
