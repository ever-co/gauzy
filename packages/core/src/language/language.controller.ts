import { Controller, Get, Param, Post, Body, UseGuards, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CrudController } from '../core';
import { Language } from './language.entity';
import { LanguageService } from './language.service';
import { PermissionGuard } from '../shared/guards/auth/permission.guard';
import { IPagination, PermissionsEnum } from '@gauzy/contracts';
import { ParseJsonPipe, Permissions } from '../shared';
@ApiTags('Languages')
@Controller()
export class LanguageController extends CrudController<Language> {
	constructor(private readonly languageService: LanguageService) {
		super(languageService);
	}

	@ApiOperation({ summary: 'Find all language.' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Found language',
		type: Language
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Record not found'
	})
	@Get()
	async findAllLanguages(
		@Query(ParseJsonPipe) data: any
	): Promise<IPagination<Language>> {
		return this.languageService.findAll(data);
	}

	@Get('getByName/:name')
	async findByName(@Param('name') name: string): Promise<Language> {
		return this.languageService.findOneByName(name);
	}

	@UseGuards(PermissionGuard)
	@Permissions(PermissionsEnum.ORG_TAGS_EDIT)
	@Post()
	async createRecord(@Body() entity: Language): Promise<any> {
		return this.languageService.create(entity);
	}
}
