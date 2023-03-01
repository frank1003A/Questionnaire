//import { useAppSelector } from "app/hooks";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Card from "components/Card";
import CustomQuestions from "components/CustomQuestions";
import Question from "components/Question";
import QuestionsMF from "components/QuestionsMF";
import UploadImage from "components/UploadImage";
import {
  updatePersonalInformation,
  updateProfileInformation,
} from "redux/applicationFormSlice";

const ApplicationForm = () => {
  const { personalInformation, profile, customisedQuestions } = useAppSelector(
    (state) => state.applicationForm
  );
  const dispatch = useAppDispatch();
  return (
    <div className="form">
      <Card
        variant={"no-add"}
        headerText={"Upload cover image"}
        cardName="coverImage"
      >
        <UploadImage />
      </Card>
      <Card
        variant={"add"}
        headerText={"Personal Information"}
        cardName="personalInformation"
      >
        <Question question="First Name" variant="no-flag" />
        <Question question="Last Name" variant="no-flag" />
        <Question question="Email" variant="no-flag" />
        <Question
          question="Phone"
          extra="without dial code"
          variant="with-flag"
          checkboxValue={personalInformation.phoneNumber.internalUse}
          switchValue={personalInformation.phoneNumber.show}
          changeFnInternal={(e) =>
            dispatch(
              updatePersonalInformation({
                data: "internalUse",
                key: "phoneNumber",
                value: e.target.checked,
              })
            )
          }
          changeFnShow={(e) =>
            dispatch(
              updatePersonalInformation({
                data: "show",
                key: "phoneNumber",
                value: e.target.checked,
              })
            )
          }
        />

        <Question
          question="Nationality"
          variant="with-flag"
          switchValue={personalInformation.nationality.show}
          changeFnInternal={(e) =>
            dispatch(
              updatePersonalInformation({
                data: "internalUse",
                key: "nationality",
                value: e.target.checked,
              })
            )
          }
          changeFnShow={(e) =>
            dispatch(
              updatePersonalInformation({
                data: "show",
                key: "nationality",
                value: e.target.checked,
              })
            )
          }
        />
        <Question
          question="Current Residence"
          variant="with-flag"
          switchValue={personalInformation.currentResidence.show}
          changeFnInternal={(e) =>
            dispatch(
              updatePersonalInformation({
                data: "internalUse",
                key: "currentResidence",
                value: e.target.checked,
              })
            )
          }
          changeFnShow={(e) =>
            dispatch(
              updatePersonalInformation({
                data: "show",
                key: "currentResidence",
                value: e.target.checked,
              })
            )
          }
        />
        <Question
          question="ID Number"
          variant="with-flag"
          switchValue={personalInformation.idNumber.show}
          changeFnInternal={(e) =>
            dispatch(
              updatePersonalInformation({
                data: "internalUse",
                key: "idNumber",
                value: e.target.checked,
              })
            )
          }
          changeFnShow={(e) =>
            dispatch(
              updatePersonalInformation({
                data: "show",
                key: "idNumber",
                value: e.target.checked,
              })
            )
          }
        />
        <Question
          question="Date of Birth"
          variant="with-flag"
          switchValue={personalInformation.dateOfBirth.show}
          changeFnInternal={(e) =>
            dispatch(
              updatePersonalInformation({
                data: "internalUse",
                key: "dateOfBirth",
                value: e.target.checked,
              })
            )
          }
          changeFnShow={(e) =>
            dispatch(
              updatePersonalInformation({
                data: "show",
                key: "dateOfBirth",
                value: e.target.checked,
              })
            )
          }
        />
        <Question
          question="Gender"
          variant="with-flag"
          switchValue={personalInformation.gender.show}
          changeFnInternal={(e) =>
            dispatch(
              updatePersonalInformation({
                data: "internalUse",
                key: "gender",
                value: e.target.checked,
              })
            )
          }
          changeFnShow={(e) =>
            dispatch(
              updatePersonalInformation({
                data: "show",
                key: "gender",
                value: e.target.checked,
              })
            )
          }
        />
        {personalInformation.personalQuestions.map((q, idx) => {
          return (
            <CustomQuestions
              customQuestion={q}
              key={idx}
              indexOfQuestion={idx}
              cardName="personalInformation"
            />
          );
        })}
      </Card>

      {/**Profile Card */}
      <Card variant={"add"} headerText={"Profile"} cardName="profile">
        <QuestionsMF
          question="Education"
          variant="with-flag"
          switchValue={profile.education.show}
          changeFnMandatory={(e) =>
            dispatch(
              updateProfileInformation({
                data: "mandatory",
                key: "education",
                value: e.target.checked,
              })
            )
          }
          changeFnShow={(e) =>
            dispatch(
              updateProfileInformation({
                data: "show",
                key: "education",
                value: e.target.checked,
              })
            )
          }
        />
        <QuestionsMF
          question="Experience"
          variant="with-flag"
          switchValue={profile.experience.show}
          changeFnMandatory={(e) =>
            dispatch(
              updateProfileInformation({
                data: "mandatory",
                key: "experience",
                value: e.target.checked,
              })
            )
          }
          changeFnShow={(e) =>
            dispatch(
              updateProfileInformation({
                data: "show",
                key: "experience",
                value: e.target.checked,
              })
            )
          }
        />
        <QuestionsMF
          question="Resume"
          variant="with-flag"
          switchValue={profile.resume.show}
          changeFnMandatory={(e) =>
            dispatch(
              updateProfileInformation({
                data: "mandatory",
                key: "resume",
                value: e.target.checked,
              })
            )
          }
          changeFnShow={(e) =>
            dispatch(
              updateProfileInformation({
                data: "show",
                key: "resume",
                value: e.target.checked,
              })
            )
          }
        />
        {profile.profileQuestions.map((q, idx) => {
          return (
            <CustomQuestions
              customQuestion={q}
              key={idx}
              indexOfQuestion={idx}
              cardName="profile"
            />
          );
        })}
      </Card>

      <Card
        variant="add"
        headerText="Additional question"
        cardName="customisedQuestions"
      >
        {customisedQuestions.customisedQuestions.map((custques, index) => {
          return (
            <CustomQuestions
              customQuestion={custques}
              key={index}
              indexOfQuestion={index}
              cardName="customisedQuestions"
            />
          );
        })}
      </Card>
    </div>
  );
};

export default ApplicationForm;
