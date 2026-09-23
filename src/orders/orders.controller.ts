import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { OrdersService } from './orders.service.js';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiRequestTimeoutResponse,
  ApiTags,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { Order } from './entities/order.entity.js';

// =============================================================================
// OrdersController
// -----------------------------------------------------------------------------
// El CRUD ya funciona. Aquí solo hay que agregar decoradores de Swagger
// (todos se importan desde '@nestjs/swagger').
//
// TODO [Estudiante 1 - Swagger]: describe QUÉ hace cada endpoint.
//   - @ApiTags('orders') sobre la clase, para agruparlos en Swagger UI.
//   - @ApiOperation({ summary: '...', description: '...' }) en cada método.
//   - @ApiParam({ name: 'id', description: '...', example: 1 }) en GET /orders/:id.
//
// TODO [Estudiante 3 - Swagger]: describe QUÉ puede responder cada endpoint.
//   - @ApiOkResponse({ type: Order }) / @ApiOkResponse({ type: [Order] })
//   - @ApiCreatedResponse({ type: Order }) en POST
//   - @ApiBadRequestResponse(...) en POST (falla la validación del DTO)
//   - @ApiNotFoundResponse(...) en GET /orders/:id
//   - @ApiRequestTimeoutResponse(...) en el reporte pesado (¡lo lanza tu interceptor!)
//
// Coordinen entre ustedes: ambos editan este archivo (hagan commits pequeños).
// =============================================================================
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @ApiOperation({
    summary: 'la lista de todas las ordenes',
    description: 'obtiene la lista de las ordenes ',
  })
  @Get()
  @ApiOkResponse({
    type: Order,
  })
  findAll() {
    return this.ordersService.findAll();
  }

  // Esta ruta se declara ANTES de ':id' para que se lea de lo más específico
  // a lo más genérico.
  @ApiOperation({
    summary: 'hace una consulta pesas ',
    description: 'tiempo estomado del reporte 4 segundos',
  })
  @Get('reports/heavy-process')
  @ApiRequestTimeoutResponse()
  generateHeavyReport() {
    return this.ordersService.generateHeavyReport();
  }
  @ApiOperation({
    summary: 'obtiene las odenes segun id ',
    description: 'segun el id que se ponga se traera el id con esa id',
  })
  @ApiParam({ name: 'id', description: 'el id del la orden', example: 1 })
  @Get(':id')
  @ApiOkResponse({
    type: Order,
  })
  @ApiNotFoundResponse()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }
  @ApiOperation({
    summary: 'crea una nueva orden',
    description: 'crea una nueva orden',
  })
  @ApiParam({ name: 'id', description: 'el id del la orden', example: 1 })
  @Post()
  @ApiCreatedResponse({ type: Order })
  @ApiBadRequestResponse()
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }
}
