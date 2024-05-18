export const CLASS_DICT = {
    proxy: "доверенность",
    contract: "договор",
    act: "акт",
    application: "заявление",
    order: "приказ",
    invoice: "счет",
    bill: "приложение",
    arrangement: "соглашение",
    "contract offer": "договор оферты",
    statute: "устав",
    determination: "решение"
}

export type TDictClass = keyof typeof CLASS_DICT


export const getFileExt = (filename: string) => {
    return filename.split('.').pop()
}


export const ADDITIONAL_FILEDS_DICT = {
    principal_name: "Имя доверителя",
    agent_name: "Имя поверенного",
    issue_date: "Дата выдачи",
    validity_period: "Срок действия",
    powers: "Полномочия",
    subject: "Предмет договора",
    terms_of_performance: "Сроки исполнения",
    payment_terms: "Условия оплаты",
    liability: "Ответственность сторон",
    act_number: "Номер акта",
    date_of_creation: "Дата составления",
    parties: "Стороны",
    list_of_works_services: "Перечень выполненных работ или услуг",
    signatures: "Подписи сторон",
    applicant_name: "Имя заявителя",
    date_of_submission: "Дата подачи",
    purpose_of_application: "Цель заявления",
    applicant_signature: "Подпись заявителя",
    order_number: "Номер приказа",
    date_of_issue: "Дата издания",
    content_of_order: "Содержание приказа",
    director_signature: "Подпись руководителя",
    invoice_number: "Номер счета",
    supplier: "Поставщик",
    buyer: "Покупатель",
    total_amount: "Сумма к оплате",
    appendix_number: "Номер приложения",
    description_of_documents: "Описание прилагаемых документов",
    date_of_agreement: "Дата соглашения",
    subject_of_agreement: "Предмет соглашения",
    terms: "Условия",
    subject_of_offer: "Предмет оферты",
    terms_of_offer: "Условия оферты",
    acceptance_procedure: "Порядок акцепта",
    organization_name: "Название организации",
    legal_address: "Юридический адрес",
    objectives: "Цели и задачи организации",
    rights_and_obligations: "Права и обязанности членов",
    decision_number: "Номер решения",
    date_of_decision: "Дата принятия",
    content_of_decision: "Содержание решения",
    participant_signatures: "Подписи участников"
} as Record<string, string>