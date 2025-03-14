import { h } from 'snabbdom';
import type LobbyController from '../../../ctrl';
import { option } from './option';

export const levelButtons = (ctrl: LobbyController) => {
  const { setupCtrl } = ctrl;
  return site.blindMode
    ? [
        h('label', { attrs: { for: 'sf_level' } }, i18n.site.strength),
        h(
          'select#sf_level',
          {
            on: { change: (e: Event) => setupCtrl.aiLevel(parseInt((e.target as HTMLSelectElement).value)) },
          },
          '12345678'.split('').map(key => option({ key, name: key }, setupCtrl.aiLevel().toString())),
        ),
      ]
    : [
        h('br'),
        i18n.site.strength,
        h('div.level.buttons', [
          h(
            'div.config_level',
            h(
              'group.radio',
              [1, 2, 3, 4, 5, 6, 7, 8].map(level =>
                h('div', [
                  h(`input#sf_level_${level}`, {
                    attrs: {
                      name: 'level',
                      type: 'radio',
                      value: level,
                      checked: level === setupCtrl.aiLevel(),
                    },
                    on: {
                      change: (e: Event) => setupCtrl.aiLevel(parseInt((e.target as HTMLInputElement).value)),
                    },
                  }),
                  h('label', { attrs: { for: `sf_level_${level}` } }, level),
                ]),
              ),
            ),
          ),
          h(
            'div.ai_info',
            h(
              `div.sf_level_${setupCtrl.aiLevel()}`,
              i18n.site.aiNameLevelAiLevel('Fairy-Stockfish 14', setupCtrl.aiLevel()),
            ),
          ),
        ]),
      ];
};
