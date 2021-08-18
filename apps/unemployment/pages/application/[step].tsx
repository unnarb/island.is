import { UnemploymentStep } from './../../entities/enums/unemployment-step.enum'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useContext } from 'react'
import PersonalInformationForm from '../../components/forms/personal-information.form'
import { UserContext } from './../../components/util/UserProvider'
import { ApplicationService } from './../../services/application.service'
import { ApplicationData } from './../../entities/application-data'
import { InitialInfo } from './../../entities/initial-info'
import { UserService } from './../../services/user.service'
import ChildrenUnderCare from '../../components/forms/children-under-care'
import EndOfEmploymentForm from './../../components/forms/end-of-employment.form'
import Calculations from './../../components/windows/calculations'

const Index: React.FC = () => {
  const { query } = useRouter()
  const stepQuery = parseInt(query.step as string)
  const [step, setStep] = useState(1)
  const router = useRouter()
  const { user } = useContext(UserContext)
  const [applicationData, setApplicationData] = useState<ApplicationData>()

  /** Load the client and set the step from query if there is one */
  useEffect(() => {
    let application = getApplication()
    if (!application) {
      application = ApplicationData.getFromUser(UserService.getUser())
    }
    setApplicationData(application)
    document.title = 'Samskipti'

    if (step !== stepQuery) {
      setStep(stepQuery)
    }
  }, [stepQuery, user])

  const getApplication = () => {
    return ApplicationService.getApplication()
  }

  const changesMade = () => {
    getApplication()
  }

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleStepChange = (step: UnemploymentStep) => {
    setStep(step)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleCancel = () => {
    router.push('/clients')
  }

  const handleSaved = (application: any) => {
    if (step === UnemploymentStep.ChildrenUnderCare) {
      setStep(UnemploymentStep.Calculation)
      return
    }
    console.log('saved')
    console.log(application)
    getApplication()
    handleNext()
  }

  if (applicationData) {
    switch (step) {
      case UnemploymentStep.PersonalInformation:
        return (
          <PersonalInformationForm
            onBack={handleBack}
            defaultValues={applicationData}
            onSubmit={handleSaved}
          ></PersonalInformationForm>
        )
        case UnemploymentStep.EndOfEmployment:
          return (
            <EndOfEmploymentForm
              onBack={handleBack}
              defaultValues={applicationData}
              onSubmit={handleSaved}
            ></EndOfEmploymentForm>
          )
      case UnemploymentStep.ChildrenUnderCare:
        return (
          <ChildrenUnderCare
            defaultValues={applicationData}
            onSubmit={handleSaved}
          />
        )
      case UnemploymentStep.Calculation:
        return <Calculations defaultValues={applicationData}></Calculations>
      default: {
        return <div></div>
      }
    }
  }
  return <div></div>
}

export default Index
