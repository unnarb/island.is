import { Query, Resolver, Context,Mutation, Args } from '@nestjs/graphql'

import { Inject, UseInterceptors } from '@nestjs/common'

import { Logger, LOGGER_PROVIDER } from '@island.is/logging'

import { BackendAPI } from '../../../services'

import { ApplicationModel } from './models'
import { CreateApplicationInput } from './dto'

@Resolver(() => ApplicationModel)
export class ApplicationResolver {
  constructor(
    @Inject(LOGGER_PROVIDER)
    private readonly logger: Logger,
  ) {}

  @Query(() => [ApplicationModel], { nullable: false })
  applications(
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
  ): Promise<ApplicationModel[]> {
    this.logger.debug('Getting all applications')

    return backendApi.getApplications()
  }

  @Mutation(() => ApplicationModel, { nullable: true })
  createApplication(
    @Args('input', { type: () => CreateApplicationInput })
    input: CreateApplicationInput,
    @Context('dataSources') { backendApi }: { backendApi: BackendAPI },
  ): Promise<ApplicationModel> {
    this.logger.debug('Creating case')

    return   backendApi.createApplication(input)
  }
}

