import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealsService } from './services/meals.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ListItemComponent } from './components/list-item/list-item.component';
import { RouterModule } from '@angular/router';
import { WorkoutsService } from './services/workouts.service';

@NgModule({
  declarations: [ListItemComponent],
  imports: [
    RouterModule,
    CommonModule,
    AngularFireDatabaseModule
  ],
  exports: [ListItemComponent]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        MealsService,
        WorkoutsService
      ]
    }
  }
}
