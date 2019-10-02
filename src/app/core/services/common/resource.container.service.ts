import {Store} from '@ngxs/store';
import {ApplicationState} from '../../store/application.state';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin} from 'rxjs';
import {CreateNewProcessingElement} from '../../store/application.state.model';

@Injectable()
export class ResourceContainerService {

  constructor(private store: Store, private httpClient: HttpClient) {
  }

  getResourceContainerById(id: string) {
    for (const container of this.store.selectSnapshot(ApplicationState.resourceContainer)) {
      if (container.id === id) {
        return container;
      }
    }

    return null;
  }

  addExamplesToContainer(containerId: string){
    forkJoin([
      this.httpClient.get(`./assets/examples/Apfel.txt`, { responseType: 'text' }),
      this.httpClient.get(`./assets/examples/Banane.txt`, { responseType: 'text' }),
      this.httpClient.get(`./assets/examples/Pfirsich.txt`, { responseType: 'text' })]).subscribe(
      (content: [string, string, string]) => {
        this.store.dispatch([
          new CreateNewProcessingElement({ initialText: content[0], containerId: containerId, title: 'Apfel.txt' }),
          new CreateNewProcessingElement({ initialText: content[1], containerId: containerId, title: 'Banane.txt' }),
          new CreateNewProcessingElement({ initialText: content[2], containerId: containerId, title: 'Pfirsich.txt' })
        ]);
      }
    );
  }
}
