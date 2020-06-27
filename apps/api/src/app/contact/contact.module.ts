import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './contact.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { ContactsController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
	imports: [TypeOrmModule.forFeature([Contact]), CqrsModule],
	controllers: [ContactsController],
	providers: [ContactService, ...CommandHandlers],
	exports: [ContactService]
})
export class ContactModule {}
