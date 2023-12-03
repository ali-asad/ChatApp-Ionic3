import { NgModule } from '@angular/core';
import { RangeComponent } from './range/range';
import { SearchComponent } from './search/search';
@NgModule({
	declarations: [RangeComponent,
    SearchComponent],
	imports: [],
	exports: [RangeComponent,
    SearchComponent]
})
export class ComponentsModule {}
