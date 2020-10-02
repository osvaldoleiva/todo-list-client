import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TareaService } from 'src/app/services/tarea.service';
import { Tarea } from 'src/app/shared/dto/Tarea';
import { TareaCategoria } from 'src/app/shared/dto/TareaCategoria';
import Swal from 'sweetalert2';
import { DialogCategoriasComponent } from '../dialog-categorias/dialog-categorias.component';

@Component({
  selector: 'app-nueva-tarea',
  templateUrl: './nueva-tarea.component.html',
  styleUrls: ['./nueva-tarea.component.css']
})
export class NuevaTareaComponent implements OnInit {

  tarea: Tarea= new Tarea();
  @Output() tareaEmmiter = new EventEmitter<Tarea>();
  
  constructor(private tarService: TareaService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.tarea.categorias =[];
    this.tarea.fechaRealizacion = new Date();  // setea la fecha de hoy 
  }

  agregar(){
    let newTarea : TareaCategoria = {
      tarea: this.tarea,
      categorias: [{id: 7, categoria:'TAREAS'}, {id: 8, categoria:'MUCHAS TAREAS'}]
    };
    this.tarService.addTarea(newTarea).subscribe(res=>{
      Swal.fire('Nueva tarea Agregada!', '', 'success');
      this.tareaEmmiter.emit(<Tarea>res);  // envia objeto para agregar al componente lista
      this.tarea = new Tarea();
      this.tarea.categorias = [];
    })
  }

  seleccionaCategorias(){
    const dial = this.dialog.open(DialogCategoriasComponent,{data: this.tarea.categorias});

    dial.afterClosed().subscribe(res=>{  // recibe las categorias seleccionadas
      this.tarea.categorias = res;      
    })
  }

}
