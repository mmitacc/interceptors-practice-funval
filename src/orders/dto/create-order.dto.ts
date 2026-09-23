import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Matches,
  Min,
  ValidateNested,
} from 'class-validator';

// =============================================================================
// DTOs de entrada para POST /orders
// -----------------------------------------------------------------------------
// Las validaciones (class-validator) YA están hechas: si el body no cumple,
// el ValidationPipe global responde 400 automáticamente.
//
// TODO [Estudiante 4 - Swagger]: agrega @ApiProperty() a cada campo con
//   `description` y `example`, para que Swagger UI muestre un body de ejemplo
//   listo para probar con "Try it out".
//   - En `items` indica el tipo del array: @ApiProperty({ type: [OrderItemDto] })
//   - Aprovecha opciones como `minimum`, `minItems` o `pattern` para que la
//     documentación refleje las mismas reglas que las validaciones.
// =============================================================================

export class OrderItemDto {
  @ApiProperty({ description: 'ID del producto', example: 102 })
  @IsInt()
  @IsPositive()
  productId: number;

  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Teclado inalambrico',
  })
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty({ description: 'Cantidad de productos', example: 2, minimum: 1 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ description: 'Precio unitario del producto', example: 159.9 })
  @IsPositive()
  unitPrice: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'Nombre del cliente', example: 'Juan Perez' })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({ description: 'Email del cliente', example: 'juan@mail.com' })
  @IsEmail()
  customerEmail: string;

  @ApiProperty({
    description: 'Lista array de objetos de los productos',
    example: [{}, {}],
    type: [OrderItemDto],
    minItems: 1,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiProperty({
    description: 'Número de Tarjeta de Crédito',
    example: '**** **** **** 4242',
    pattern: '/^\d{16}$/',
  })
  @Matches(/^\d{16}$/, {
    message: 'creditCard debe tener exactamente 16 dígitos numéricos',
  })
  creditCard: string;
}
