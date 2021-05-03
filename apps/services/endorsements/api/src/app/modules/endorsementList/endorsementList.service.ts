import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'
import { Logger, LOGGER_PROVIDER } from '@island.is/logging'
import { EndorsementList } from './endorsementList.model'
import { EndorsementListDto } from './dto/endorsementList.dto'
import { Endorsement } from '../endorsement/endorsement.model'

interface createInput extends EndorsementListDto {
  owner: string
}
@Injectable()
export class EndorsementListService {
  constructor(
    @InjectModel(Endorsement)
    private endorsementModel: typeof Endorsement,
    @InjectModel(EndorsementList)
    private readonly endorsementListModel: typeof EndorsementList,
    @Inject(LOGGER_PROVIDER)
    private logger: Logger,
  ) {}

  async findListsByTag(tag: string) {
    this.logger.debug(`Finding endorsement lists by tag "${tag}"`)
    // TODO: Add option to get only open endorsement lists
    return this.endorsementListModel.findAll({
      where: { tags: { [Op.contains]: [tag] } },
    })
  }

  async findSingleList(listId: string) {
    this.logger.debug(`Finding single endorsement lists by id "${listId}"`)
    const result = await this.endorsementListModel.findOne({
      where: { id: listId },
    })

    if (!result) {
      throw new NotFoundException(['This endorsement list does not exist.'])
    }

    return result
  }

  async findAllEndorsementsByNationalId(nationalId: string) {
    this.logger.debug(`Finding endorsements for single national id`)
    return this.endorsementModel.findAll({ where: { endorser: nationalId } })
  }

  async close(listId: string): Promise<EndorsementList> {
    this.logger.debug('Closing endorsement list', listId)
    const [_, endorsementLists] = await this.endorsementListModel.update(
      { closedDate: new Date() },
      { where: { id: listId }, returning: true },
    )

    if (!endorsementLists[0]) {
      this.logger.warn('Failed to close list', { listId })
      throw new NotFoundException(['This endorsement list does not exist.'])
    }

    return endorsementLists[0]
  }

  async create(list: createInput) {
    this.logger.debug('Creating endorsement list')
    return this.endorsementListModel.create({
      title: list.title,
      description: list.description,
      endorsementMeta: list.endorsementMeta,
      tags: list.tags,
      validationRules: list.validationRules,
      owner: list.owner,
    })
  }
}