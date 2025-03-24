import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';

const log = (...messages: string[]) => {
  console.log(`${messages[0]} %c${messages.slice(1).join(', ')}`, 'color: #bada55');
}

@Component({
  selector: 'app-home-page',
  imports: [TitleComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  traditionalProperty = 'Fernando';
  signalProperty = signal('Fernando');

  changeTraditional(){
    this.traditionalProperty = 'Jonathan';
  }

  changeSignal(){
    this.signalProperty.set('Jonathan');
  }

  //El constructor es llamado al generarse una instancia del componente
  constructor() {
    log('Constructor llamado');

    // setTimeout(()=> {
    //   this.traditionalProperty = 'Jonathan'; //No se va a reflejar el cambio en la plantilla usando zoneless
    //   this.signalProperty.set('Jonathan') //Si se vaa ver el cambio en la plantilla usando zoneless;
    // }, 2000)
  }

  basicEffect = effect((onCleanup)=> {
    log('on', 'Disparar efectos secundarios');

    onCleanup(()=>{
      log('onCleanup','Se ejecuta cuando se destruye el efecto');
    })
  })

  ngOnInit() {
    log('ngOnInit','Runs once after Angular has initialized all the components inputs.');
  }
  ngOnChanges() {
    log('ngOnChanges','Runs every time the components inputs have changed.');
  }
  ngDoCheck() {
    log('ngDoCheck','Runs every time this component is checked for changes.');
  }
  ngAfterContentInit() {
    log('ngAfterContentInit','Runs once after the components content has been initialized.');
  }
  ngAfterContentChecked() {
    log('ngAfterContentChecked','Runs every time this component content has been checked for changes.');
  }
  ngAfterViewInit() {
    log('ngAfterViewInit','Runs once after the components view has been initialized.');
  }
  ngAfterViewChecked() {
    log('ngAfterViewChecked','Runs every time the components view has been checked for changes.');
  }

  ngOnDestroy(){
    log('ngOnDestroy','Runs once the component get destroyed');
  }
}
