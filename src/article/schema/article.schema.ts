import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, {HydratedDocument} from "mongoose";

export type ArticleDocument = HydratedDocument<Article>

@Schema()
export class Article{
    @Prop()
    title: string

    @Prop()
    description: string

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]})
    comments: Comment[]

    @Prop()
    author: string
}

export const ArticleSchema = SchemaFactory.createForClass(Article)