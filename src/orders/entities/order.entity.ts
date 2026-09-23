// =============================================================================
// Entidad Order (en memoria)
// -----------------------------------------------------------------------------
// Se usan CLASES (no interfaces) a propósito: Swagger solo puede leer los
// decoradores @ApiProperty() de una clase; las interfaces desaparecen al
// compilar a JavaScript.
//
// ⚠️ Esta entidad contiene campos SENSIBLES (passwordHash, creditCard,
// clientSecret). El servicio los devuelve "tal cual" a propósito: es trabajo
// del SanitizeInterceptor limpiarlos antes de que lleguen al cliente.
//
// TODO [Estudiante 4 - Swagger]: documenta cada propiedad con @ApiProperty()
//   (description + example). Importa desde '@nestjs/swagger'.
//   - En `creditCard` usa como example el valor YA ENMASCARADO
//     ('**** **** **** 4242'), porque es lo que verá el cliente.
//   - NO documentes `passwordHash` ni `clientSecret`: el cliente nunca los
//     recibe, así que no deben aparecer en el contrato público. Puedes usar
//     @ApiHideProperty() para dejarlo explícito.
//   - En `status` usa `enum: OrderStatus`.
// =============================================================================

import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  CANCELLED = 'CANCELLED',
}

export class Customer {
  @ApiProperty({ description: 'Nombre del cliente', example: 'Juan Perez' })
  name: string;

  @ApiProperty({ description: 'Email del cliente', example: 'juan@mail.com' })
  email: string;

  /** Hash de la contraseña del cliente. NUNCA debe salir de la API. */
  @ApiHideProperty()
  passwordHash: string;
}

export class OrderItem {
  @ApiProperty({ description: 'ID del producto', example: 102 })
  productId: number;

  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Teclado inalambrico',
  })
  productName: string;

  @ApiProperty({ description: 'Cantidad de productos', example: 2 })
  quantity: number;

  @ApiProperty({ description: 'Precio unitario del producto', example: 159.9 })
  unitPrice: number;
}

export class PaymentInfo {
  /** Número completo de tarjeta. Debe enmascararse: '**** **** **** 4242'. */
  @ApiProperty({
    description: 'Número de Tarjeta de Crédito',
    example: '**** **** **** 4242',
  })
  creditCard: string;

  /** Secreto de la pasarela de pagos. NUNCA debe salir de la API. */
  @ApiHideProperty()
  clientSecret: string;
}

export class Order {
  @ApiProperty({ description: 'ID de la orden de compra', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Objeto con los datos del Cliente',
    example: { name: 'Jose Perez', email: 'jose@mail.com' },
  })
  customer: Customer;

  @ApiProperty({
    description: 'Lista array de objetos de los productos',
    example: [{}, {}],
  })
  items: OrderItem[];

  @ApiProperty({
    description:
      'Total acumulado de los items de compra en cantidad * unitPrecio ',
    example: 266.6,
  })
  total: number;

  @ApiProperty({
    description:
      'Estado de la orden de compra (PENDING, PAID, SHIPPED, CANCELLED)',
    example: OrderStatus.PENDING,
    enum: OrderStatus,
  })
  status: OrderStatus;

  @ApiProperty({
    description: 'Objeto con los datos del metodo de pago (tarjeta de credito)',
    example: { creditCard: '**** **** **** 4242' },
  })
  payment: PaymentInfo;

  @ApiProperty({
    description: 'Fecha de la orden de pago',
    example: '2026-09-10T09:05:00.000Z',
  })
  createdAt: Date;
}
