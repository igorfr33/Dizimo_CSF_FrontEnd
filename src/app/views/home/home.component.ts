import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';

export interface PeriodicElement {
  id: number;
  Nome: string;
  DataNascimento: string;
  Rua: string;
  Bairro: string;
  Cidade: string;
  Estado: string;
  Cep: string;
  Telefone: string;
  WhatsApp: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, Nome: 'Igor Rabelo', DataNascimento: '28-12-2000', Rua: 'José Morais, 63', Bairro: 'Cazeca', Cidade: 'Uberlândia', Estado: 'Minas Gerais', Cep: '38400-018', Telefone: '34 99766-2695', WhatsApp:'34 99766-2695'},
  {id: 2, Nome: 'Danilo Rabelo', DataNascimento: '06-07-1962', Rua: 'José Morais, 63', Bairro: 'Cazeca', Cidade: 'Uberlândia', Estado: 'Minas Gerais', Cep: '38400-018', Telefone: '34 99766-2695', WhatsApp:'34 99766-2695'},

];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  @ViewChild(MatTable)
  table!: MatTable<any>
  displayedColumns: string[] = ['nome', 'dataNascimento', 'rua', 'bairro', 'cidade', 'estado', 'cep', 'telefone', 'whatsApp', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(element: PeriodicElement | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        Nome: '',
        DataNascimento: '',
        Rua: '',
        Bairro: '',
        Cidade: '',
        Estado: '',
        Cep: '',
        Telefone: '',
        WhatsApp: ''
      } : {
        Nome: element.Nome,
        DataNascimento: element.DataNascimento,
        Rua: element.Rua,
        Bairro: element.Bairro,
        Cidade: element.Cidade,
        Estado: element.Estado,
        Cep: element.Cep,
        Telefone: element.Telefone,
        WhatsApp: element.WhatsApp
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if(this.dataSource.map(p => p.id).includes(result.id)){
          this.dataSource[result.id - 1] = result
          this.table.renderRows() 
        } else {
          this.dataSource.push(result)
          this.table.renderRows()
        }
      }
    })
  }

  editDizimista(element: PeriodicElement): void {
    this.openDialog(element) 
  }

  deleteDizimista(id: number): void {
    this.dataSource = this.dataSource.filter(p => p.id !== id)
  }

}
