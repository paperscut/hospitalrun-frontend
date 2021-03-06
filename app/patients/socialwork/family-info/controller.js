import { alias } from '@ember/object/computed';
import Controller, { inject as controller } from '@ember/controller';
import IsUpdateDisabled from 'hospitalrun/mixins/is-update-disabled';
import { translationMacro as t } from 'ember-i18n';
import { computed } from '@ember/object';

export default Controller.extend(IsUpdateDisabled, {
  patientsController: controller('patients'),

  editController: alias('patientsController'),
  showUpdateButton: true,
  title: t('patients.titles.familyInfo'),
  updateButtonAction: 'update',

  updateButtonText: computed('model.isNew', function() {
    let isNew = this.get('model.isNew');
    if (isNew) {
      return this.get('i18n').t('buttons.add');
    } else {
      return this.get('i18n').t('buttons.update');
    }
  }),

  actions: {
    cancel() {
      this.send('closeModal');
    },

    update() {
      let model = this.get('model');
      this.get('editController').send('updateFamilyInfo', model);
    }
  }
});
