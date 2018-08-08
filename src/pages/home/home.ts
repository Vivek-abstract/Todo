import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AlertController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public tasks = [];

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) {}

  addTask(taskName) {
    this.tasks.push({
      name: taskName
    });
  }

  deleteTask(index) {
    this.tasks.splice(index, 1);
  }

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: "Add Task",
      message: "Enter a new task",
      inputs: [
        {
          name: "title",
          placeholder: "Title"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Save",
          handler: data => {
            this.addTask(data.title);
          }
        }
      ]
    });
    prompt.present();
  }
}
