export interface PersonalInformation {
    firstName: {internalUse: boolean, show: boolean};
    lastName:  {internalUse: boolean, show: boolean};
    emailId:  {internalUse: boolean, show: boolean};
    phoneNumber: {internalUse: boolean, show: boolean};
    nationality: {internalUse: boolean, show: boolean};
    currentResidence: {internalUse: boolean, show: boolean};
    idNumber: {internalUse: boolean, show: boolean};
    dateOfBirth: {internalUse: boolean, show: boolean};
    gender: {internalUse: boolean, show: boolean};
    personalQuestions: Array<Question>;
}

export interface Profile {
    education: {mandatory: boolean, show: boolean};
    experience: {mandatory: boolean, show: boolean};
    resume: {mandatory: boolean, show: boolean};
    profileQuestions: Array<Question>;
}

export interface CustomisedQuestions {
    customisedQuestions: Array<Question>;
}

export type Question = {
    id: string;
    type: string;
    question: string;
    choice: Array<string>;
    maxChoice: number;
    disqualify: boolean;
    other: boolean
}

export default class ApplicationForm {
    constructor(
        public coverImage: string,
        public personalInformation: PersonalInformation,
        public profile: Profile,
        public customisedQuestions: CustomisedQuestions
    ){}
}