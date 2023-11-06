import { HttpException, Type } from '@nestjs/common';
import { FieldSettings, mode } from './../model/fieldSettings.model';
import { CollectionPecCode } from './../model/collection.model';
import { ObjectSchema, PropertiesTypes } from 'realm';


export class structBuilder {
    
    
    private _nameCollection : string;
    private get nameCollection() : string {
        return this._nameCollection;
    }
    private set nameCollection(v : string) {
        this._nameCollection = v;
    }
    
    
    private _schema : ObjectSchema;
    private get schema() : ObjectSchema {
        return this._schema;
    }
    private set schema(v : ObjectSchema) {
        this._schema = v;
    }
    
    
    private _struct : CollectionPecCode;
    public get struct() : CollectionPecCode {
        return this._struct;
    }
    private set struct(v : CollectionPecCode) {
        this._struct = v;
    }
    
    private _fields: FieldSettings[] = [];

    constructor(name: string){
        this.nameCollection = name;        
    }

    addField(field: FieldSettings) {
        if (!this.nameCollection) {
            throw new Error("Undefined collection name");
        }
        else {
            this._fields.push(field);
        }
    }

    getStruct(): CollectionPecCode {

        this.struct = {
            name: this._nameCollection,
            fields: this._fields 
        }

        return this.struct
    }

    getSchema(): ObjectSchema {
        
        let schema: ObjectSchema = {
            name: this._nameCollection,
            primaryKey: '_id',
            properties: this.getPropertiesFromSchema()
        }

        return schema
    }


    getPropertiesFromSchema(): PropertiesTypes {
        let result: PropertiesTypes;
        let props = this._fields.map((value,index)=>{
            return [value.name,value.type]
        });
        
        result = Object.fromEntries(props);
    return result
    }


    // getStruct(schema: ObjectSchema) : CollectionPecCode {
    //     let prettyCollection: CollectionPecCode = {
    //         name : schema.name,
    //         fields : this.getfields(schema.properties)
    //     } ;

    //     return prettyCollection;
    // }

    // getfields(properties: Realm.PropertiesTypes): import("../model/fieldSettings.model").FieldSettings[] {
    //     let prettyFields: FieldSettings[] = [];
    //     let fieldSetting: FieldSettings;
    //     const fields = Object.entries(properties);

    //     fields.map((field)=>{
    //         if (field[0].includes("id") || this.dateControl(field)) {
    //             fieldSetting =  {
    //                 name: field[0],
    //                 label:  field[0],
    //                 type: field[1].toString(),
    //                 mode: mode.browse,
    //                 maxSize: 240,
    //                 pattern: "",
    //             }
    //         }
    //         else {
    //             fieldSetting = {
    //                 name: field[0],
    //                 label:  field[0],
    //                 type: field[1].toString(),
    //                 mode: mode.browse,
    //                 maxSize: 240,
    //                 pattern: "",
    //             }
    //         }

    //         prettyFields.push(fieldSetting)
    //     })
        
    //     return prettyFields
    // }

    // private dateControl(field: [string, string | ObjectSchema | Realm.ObjectSchemaProperty]): boolean {
    //     return field[0].includes("createdAt") || field[0].includes("updatedAt") || field[0].includes("deletedAt");
    // }
}
