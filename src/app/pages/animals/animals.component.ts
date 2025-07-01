import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Pet {
  id: number;
  nombre: string;
  edad: string;
  descripcion: string;
  foto: string;
  adoptado: boolean;
}

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss']
})
export class AnimalsComponent {
 pets: Pet[] = [
  {
    id: 1,
    nombre: 'Luna',
    edad: '1 año',
    descripcion: 'Gata cariñosa y juguetona.',
    foto: 'assets/img/gato1.jpg',
    adoptado: false
  },
  {
    id: 2,
    nombre: 'Simba',
    edad: '3 años',
    descripcion: 'Gato sociable y tranquilo.',
    foto: 'assets/img/gato2.jpeg',   
    adoptado: false
  },
  {
    id: 3,
    nombre: 'Nala',
    edad: '6 meses',
    descripcion: 'Gata curiosa y muy activa.',
    foto: 'assets/img/gato3.jpg',
    adoptado: false
  },
  {
    id: 4,
    nombre: 'Rocco',
    edad: '4 años',
    descripcion: 'Perro leal y juguetón.',
    foto: 'assets/img/perro1.jpg',
    adoptado: false
  },
  {
    id: 5,
    nombre: 'Bella',
    edad: '2 años',
    descripcion: 'Perra tranquila y cariñosa.',
    foto: 'assets/img/perro2.jpeg',
    adoptado: false
  },
  {
    id: 6,
    nombre: 'Max',
    edad: '6 meses',
    descripcion: 'Cachorro lleno de energía y amor.',
    foto: 'assets/img/perro3.jpg',
    adoptado: false
  }
];

  adopt(pet: Pet): void {
    pet.adoptado = true;
    alert(`¡Gracias por adoptar a ${pet.nombre}!`);
  }
}
