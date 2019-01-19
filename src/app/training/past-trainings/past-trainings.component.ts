import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit {
  pastExercises;
  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.pastExercises = this.trainingService.getPastExercises();
    console.log(this.pastExercises);
  }

}
