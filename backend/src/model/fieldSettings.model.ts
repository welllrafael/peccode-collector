
export interface FieldSettings{
    name: string;
    label: string;
    type: string;
    mode: mode;
    pattern: string;
    maxSize: number;
    keyConstraint?: string;
    constraint?: string;
}

export enum mode {
    browse,
    form
}