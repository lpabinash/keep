



import { Component, OnInit } from '@angular/core';
import { NotesService } from './notes.service';
import { Note } from './note';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  errMessage: string;
  notesarray: Array<Note>;
  note: Note = new Note('', '');
  constructor(private service: NotesService) { }

  ngOnInit() {
    this.service.getNotes().subscribe((data: any) => {
      this.notesarray = data;
    }, (err: any) => {
      this.errMessage = err.message;
    });
  }


  addNote(note: Note): void {
    if (this.note.title === '' || this.note.text === '') {
      this.errMessage = 'Title and Text both are required fields';
    } else {
      this.service.addNote(this.note).subscribe((data: any) => { }, (err: any) => {
        this.errMessage = err.message;
      });
      this.notesarray.push(this.note);
    }
  }
}
