export const CLASS_DICT = {
    0: 'Кабарга',
    1: 'Косуля',
    2: 'Олень'
}

export type TDictClass = keyof typeof CLASS_DICT


export const getFileExt = (filename: string) => {
    return filename.split('.').pop()
}


export const ADDITIONAL_FILEDS_DICT = {
    
} as Record<string, string>