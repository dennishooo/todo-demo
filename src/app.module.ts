import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [PrismaModule.forRoot({ isGlobal: true }), TodosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
