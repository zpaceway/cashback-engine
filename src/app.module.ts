import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabasesModule } from './databases/databases.module';
import { LoggerModule } from './logger/logger.module';
import { MonitoringModule } from './monitoring/monitoring.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule,
    OrdersModule,
    DatabasesModule,
    LoggerModule,
    MonitoringModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
