import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductOption } from '../product-option/product-option.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductOptionService } from '../product-option/product-option.service';
import { ProductCreateHandler } from './commands/handlers/product.create.handler';
import { ProductUpdateHandler } from './commands/handlers/product.update.handler';

@Module({
	imports: [TypeOrmModule.forFeature([Product, ProductOption]), CqrsModule],
	controllers: [ProductController],
	providers: [
		ProductService,
		ProductOptionService,
		ProductCreateHandler,
		ProductUpdateHandler
	],
	exports: [ProductService]
})
export class ProductModule {}
