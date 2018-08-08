import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AlertController } from "ionic-angular";
import { Storage } from "@ionic/storage";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  public tasks = [{ name: "Vivek" }];

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public storage: Storage
  ) {
    storage.get("tasks").then(data => {
      if (data === null) {
        // Variable is not set in storage so init to blank
        this.tasks = [];
        storage.set("tasks", this.tasks);
      } else {
        // Get previous tasks from storage
        this.tasks = data;
      }
    });
  }

  addTask(taskName) {
    // Add a task with name taskName
    this.tasks.push({
      name: taskName
    });
    // Set the tasks variable in storage for persistency
    this.storage.set("tasks", this.tasks);
  }

  deleteTask(index) {
    // Remove task at index
    this.tasks.splice(index, 1);
    this.storage.set("tasks", this.tasks);
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
            // Call the addTask method
            this.addTask(data.title);
          }
        }
      ]
    });
    prompt.present();
  }
}
