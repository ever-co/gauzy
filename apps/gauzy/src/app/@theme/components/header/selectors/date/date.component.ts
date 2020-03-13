import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {
	NbCalendarMonthCellComponent,
	NbCalendarMonthPickerComponent,
	NbCalendarYearPickerComponent
} from '@nebular/theme';
import { Store } from 'apps/gauzy/src/app/@core/services/store.service';
import { monthNames } from '../../../../../@core/utils/date';

@Component({
	selector: 'ga-date-selector',
	templateUrl: './date.component.html',
	styleUrls: ['./date.component.scss'],
	host: {
		'(document:click)': 'clickOutside($event)'
	}
})
export class DateSelectorComponent implements OnInit {
	monthCellComponent = NbCalendarMonthCellComponent;
	loadCalendar = false;
	dateInputValue: string;
	date = new Date();
	max = new Date();
	@ViewChild('month', { static: false })
	monthRef: NbCalendarMonthPickerComponent<any, any>;

	constructor(private store: Store) {}

	ngOnInit() {
		this.store.selectedDate = this.date;
		this.dateInputValue = this.formatDateMMMMyy(this.date);
	}

	handleDateChange(chosenDate: Date) {
		/**
		 * Selecting a month from previous year which is unavailable for current year
		 * and then selecting current year, makes the unavailable month selected for current year
		 * Ensure that chosenDate does not exceed the max limit
		 */
		chosenDate =
			chosenDate > this.monthRef.max ? this.monthRef.max : chosenDate;

		this.store.selectedDate = chosenDate;
		this.date = chosenDate;

		/**
		 * nb-calendar-month-picker component does not get updated when the year is changed
		 * manually refresh the month picker component
		 */
		this.monthRef.month = chosenDate;
		this.monthRef.initMonths();

		this.dateInputValue = this.formatDateMMMMyy(this.date);
	}

	formatDateMMMMyy(date): string {
		const monthIndex = date.getMonth();
		const year = date.getFullYear();

		return monthNames[monthIndex] + ', ' + year;
	}

	clear() {
		this.dateInputValue = '';
		this.date = new Date();
		this.store.selectedDate = null;
	}

	clickOutside(event) {
		if (
			!document
				.getElementById('dashboard-calendar')
				.contains(event.target)
		) {
			this.loadCalendar = false;
		}
	}
}
