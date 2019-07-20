import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() backToTop: boolean;

  @Output() goToTopAction: EventEmitter<void> = new EventEmitter<void>()

  constructor() { }

  ngOnInit() {
  }

  public goToTop(){
    this.goToTopAction.emit();
  }
}
