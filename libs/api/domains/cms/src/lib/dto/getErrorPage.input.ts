import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType()
export class GetErrorPageInput {
  @Field()
  @IsString()
  errorCode: string

  @Field()
  @IsString()
  lang: string
}