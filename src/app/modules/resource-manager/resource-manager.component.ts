import {Component, OnInit} from '@angular/core';
import {FileManagerService} from '../../core/services/files/file-manager.service';
import {Store} from '@ngxs/store';
import {AuthState} from '../../core/store/auth.state';
import {RepositoryFileResponse} from '../../domain/resources/repository.file.response';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material';
import {forkJoin, of} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {DocumentsRepositoryFile} from '../../domain/resources/documents-repository-file';

@Component({
  selector: 'app-resource-manager',
  templateUrl: './resource-manager.component.html',
  styleUrls: ['./resource-manager.component.scss']
})
export class ResourceManagerComponent implements OnInit {

  totalFiles = 0;

  tree: RepositoryFileResponse[] = null;
  nodesLoading = true;
  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;

  files: DocumentsRepositoryFile[] = [];
  selectedNode = null;
  filesLoading = false;

  loadingSimple = false;

  sorting = {
    attr: null,
    order: 'ASC'
  };

  hasNestedChild = (_: number, nodeData) => {
    return !nodeData.isLeaf;
  };

  constructor(private fileManager: FileManagerService, private store: Store) {
    this.nestedTreeControl = new NestedTreeControl(node => of(node.children));
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.loadRootContent();
  }

  ngOnInit() {
  }

  private loadRootContent() {
    const session = this.store.selectSnapshot(AuthState.session);

    this.fileManager.getFolders('root', session).subscribe(
      (data: { success: boolean, total: number, data: RepositoryFileResponse[] }) => {
        this.tree = data.data;
        this.nestedDataSource.data = this.buildTree(this.tree);
        this.nodesLoading = false;
      }
    );
  }

  private buildTree(inputList) {
    const nodes = [];

    if (isNullOrUndefined(inputList)) {
      return;
    }

    for (const document of inputList) {
      nodes.push(this.buildTreeNode(document));
    }

    return nodes;
  }

  private buildTreeNode(document: RepositoryFileResponse) {
    return {
      filename: document.text,
      children: [],
      id: document.id,
      uri: document.uri,
      isLeaf: document.leaf,
      loading: false
    };
  }

  addTextToSelection(node) {
    this.selectedNode = node;
    this.filesLoading = true;

    const session = this.store.selectSnapshot(AuthState.session);

    this.fileManager.getFiles(node.uri, session, this.buildSort()).subscribe(
      (data: { data: DocumentsRepositoryFile[], total: number }) => {
        data.data.map(function (el) {
          el.selected = false;
        });
        this.files = data.data;
        this.filesLoading = false;
        this.totalFiles = data.total;
      }
    );
  }

  loadChildren(node, wasExpanded) {
    if (!wasExpanded) {
      return;
    }

    node.loading = true;
    const session = this.store.selectSnapshot(AuthState.session);

    this.fileManager.getFolders(node.id, session).subscribe(
      (data: { success: boolean, data: RepositoryFileResponse[] }) => {
        node.loading = false;
        node.children = this.buildTree(data.data);
        this.refreshTree();
      }
    );
  }

  refreshTree() {
    const _data = this.nestedDataSource.data;
    this.nestedDataSource.data = null;
    this.nestedDataSource.data = _data;
  }

  setFilter(attr: string) {
    if (this.sorting.attr === attr) {
      this.sorting.order = (this.sorting.order === 'ASC') ? 'DESC' : 'ASC';
    } else {
      this.sorting.attr = attr;
    }

    this.addTextToSelection(this.selectedNode);
  }

  private buildSort() {
    return {direction: this.sorting.order, property: this.sorting.attr};
  }

  getArrowClass() {
    if (this.sorting.order === 'ASC') {
      return 'fa-arrow-down';
    }

    return 'fa-arrow-up';
  }

  selectedFiles() {
    return this.files.filter(function (el) {
      return el.selected;
    }).length;
  }

  deleteFiles() {
    const session = this.store.selectSnapshot(AuthState.session);
    // uri // https://resources.hucompute.org/job/19123
    const observers = [];

    for (const selectedFile of this.files.filter((file: any) => file.selected)) {
      console.log(selectedFile);
      observers.push(this.fileManager.deleteFile(selectedFile.uri, this.selectedNode.uri, session));
    }

    this.loadingSimple = true;
    forkJoin(observers).subscribe(
      _ => this.loadingSimple = false,
      _ => this.loadingSimple = false
    );
  }
}

/**
 * File node data with nested structure.
 * Each node has a filename, and a type or a list of children.
 */
export class FileNode {
  id: string;
  children: FileNode[];
  filename: string;
  uri: string;
  isLeaf: boolean;
  loading: boolean;
}
