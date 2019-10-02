import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {ApplicationState} from './core/store/application.state';
import {Observable} from 'rxjs';
import {ResourceContainer} from './domain/core/resource.container';
import {ImportContainer, ProcessStackTasks} from './core/store/application.state.model';
import {HttpClient} from '@angular/common/http';
import {InitAuth} from './core/store/auth.state.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @Select(ApplicationState.resourceContainer) resourceContainer$: Observable<ResourceContainer[]>;

  constructor(private store: Store, private httpClient: HttpClient) {
    this.httpClient.get(`./assets/resources/auswertung.json`).subscribe(
      (content: ResourceContainer) => {
        this.store.dispatch(new ImportContainer({container: content}));
      }
    );
  }

  ngOnInit(): void {
    this.startCoreOverwatch();

    this.store.dispatch(new InitAuth());
  }

 

  private startCoreOverwatch() {
    setInterval(() => {
      console.log('Core Overwatch...');
      this.store.dispatch(new ProcessStackTasks());
    }, 1000);
  }
}
