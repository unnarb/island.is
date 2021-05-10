import {
  buildForm,
  buildSection,
  Form,
  FormModes,
  buildTextField,
} from '@island.is/application/core'
import * as m from '../lib/messages'

export const JointCustodyAgreementForm: Form = buildForm({
  id: 'JointCustodyAgreementForm',
  title: m.application.name,
  mode: FormModes.APPLYING,
  children: [
    buildSection({
      id: 'jointCustodyAgreementForm',
      title: 'Sameiginleg forsjá',
      children: [
        buildTextField({
          id: 'applicant.nationalId',
          title: 'Kennitala',
          format: '######-####',
          backgroundColor: 'blue',
        }),
      ],
    }),
  ],
})