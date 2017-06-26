import {Component, ElementRef} from 'angular2/core';
import { Ng2DragDropModule } from 'ng2-drag-drop';


export class Task {
    id: number;
    head: string;
    desc: string;
    deadline: string;

}

@Component({
    selector: 'my-app',
    template: `
    <div class="container">
        <div class="header">
            <h1>Task Messenger</h1>
        </div>
        
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Новая задача
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">
                    <label>Введите заголовок: </label>
                    <input type="text" [(ngModel)]="head"/>
                </a>
                <a class="dropdown-item" href="#">
                    <label>Введите описание: </label>
                    <input type="text" [(ngModel)]="desc" />
                </a>
                <a class="dropdown-item" href="#">
                    <label>Введите срок выполнения: </label>
                    <input type="date" [(ngModel)]="deadline"/>
                </a>
                <a class="dropdown-item" href="#">
                    <button (click)="addTask(head, desc, deadline)">Добавить задачу</button>
                </a>
            </div>
        </div>
        
        <div id="list4">
            <ul droppable="true" class="task_wrap">
                <li class="ng-draggable" draggable="true" *ngFor="#task of tasks" class="list-group-task" (click)="onSelect(task)" [class.selected]="task === selectedTask">
                    <a href="#">
                        <strong>
                            <div [ngClass]="compareDate(task)===true ? 'red':'white'" (click)="toggleEdit()">
                                <label>Название задачи:</label><br/>  
                                <span class="taskhead">{{task.head}}</span><br/>
                                <label>Описание:</label><br/>
                                <span class="taskdesc" >{{task.desc}}</span><br/>
                                <label>Крайний срок:</label><br/>
                                <span class="taskddline" >{{task.deadline}}</span>                                
                            </div>
                        </strong>
                    </a>
                </li>
                <div *ngIf="selectedTask" [style.display]="visibility==true?'block':'none'">
                        <div>
                            <form>
                                <label>Заголовок: </label>
                                <input type="text" [(ngModel)]="selectedTask.head">
                                <label>Описание: </label>
                                <input type="text" [(ngModel)]="selectedTask.desc">
                                <label>Крайний срок: </label>
                                <input type="date" [(ngModel)]="selectedTask.deadline">
                                <button (click)="toggleEdit()">Применить</button>
                                <button (click)="deleteTask(selectedTask)">Удалить</button>
                                </form>                                
                        </div>                                              
                </div>
            </ul>
        </div>
    </div>
`,
    styles: [`
            .ng-draggable {
                cursor: move;
            }
            .white {
                background-color: #EEEEEE;
            }
            .red{
                background-color: #fad2d2;
            }
            .container {
                width: 400px;
                text-align: center;
            }
            #list4 { width:320px; font-family:Georgia, Times, serif; font-size:15px; }
#list4 ul { list-style: none; }
#list4 ul li { }
#list4 ul li a { display:block; text-decoration:none; color:#000000; 
background-color:#FFFFFF; line-height:30px; border-style: solid; border-width: 1px;
border-radius: 3px; border-color: #CCC; 
margin:10px; cursor:pointer; }
#list4 ul li a:hover { color:#FFFFFF; 
background-repeat:repeat-x; }
#list4 ul li a strong { margin-right:10px; }
`]

})
export class AppComponent {
    selectedTask: Task;
    public tasks = TASKS;

    onSelect(task: Task){
        this.selectedTask = task;
    }

    addTask(head, desc, deadline){
        let task = new Task();
        task.id = this.tasks.length;
        task.head = head;
        task.desc = desc;
        task.deadline = deadline;
        this.tasks.push(task);
    }

    visibility: boolean = true;

    toggleEdit(){
        this.visibility=!this.visibility;
    }
    deleteTask(task){
        this.tasks.splice(this.tasks.indexOf(task));
        this.toggleEdit();
    }



    compareDate(task: Task) : boolean{

        let color: boolean = false;
        let date = new Date();
        let taskDate = new Date(task.deadline);
        if(taskDate.getDate()-date.getDate()<3 && date.getMonth()-taskDate.getMonth()==0 && date.getFullYear()-taskDate.getFullYear()==0){
                color = !color;
            }
        return color;
        }



    }



var TASKS: Task[] = [
    {"id": 0, "head":"Some head 2", "desc":"Some desc 2", "deadline": "2017-10-20"},
    {"id": 1, "head":"Some head 3", "desc":"Some desc 3", "deadline": "2017-10-10"}
]
