declare module 'react-big-calendar' {
    import { ComponentType, ReactNode } from 'react';
  
    export interface Event {
      title: string;
      start: Date;
      end: Date;
      allDay?: boolean;
      resource?: any;
    }
  
    export interface CalendarProps {
      localizer: any;
      events: Event[];
      startAccessor?: string | ((event: Event) => Date);
      endAccessor?: string | ((event: Event) => Date);
      allDayAccessor?: string | ((event: Event) => boolean);
      tooltipAccessor?: string | ((event: Event) => string);
      titleAccessor?: string | ((event: Event) => string);
      resourceAccessor?: string | ((event: Event) => any);
      resources?: any[];
      resourceIdAccessor?: string | ((resource: any) => any);
      resourceTitleAccessor?: string | ((resource: any) => string);
      defaultView?: string;
      views?: any;
      step?: number;
      length?: number;
      date?: Date;
      getNow?: () => Date;
      onNavigate?: (newDate: Date, view: string, action: string) => void;
      onView?: (view: string) => void;
      onDrillDown?: (date: Date, view: string) => void;
      onSelectSlot?: (slotInfo: any) => void;
      onSelectEvent?: (event: Event, e: React.SyntheticEvent<HTMLElement>) => void;
      onDoubleClickEvent?: (event: Event, e: React.SyntheticEvent<HTMLElement>) => void;
      onKeyPressEvent?: (event: Event, e: React.SyntheticEvent<HTMLElement>) => void;
      onSelecting?: (range: { start: Date; end: Date }) => boolean | undefined;
      selected?: Event;
      defaultDate?: Date;
      scrollToTime?: Date;
      popup?: boolean;
      popupOffset?: number | { x: number; y: number };
      toolbar?: boolean;
      className?: string;
      elementProps?: React.HTMLAttributes<HTMLElement>;
      components?: {
        event?: ComponentType<any>;
        eventWrapper?: ComponentType<any>;
        dayWrapper?: ComponentType<any>;
        dateCellWrapper?: ComponentType<any>;
        timeSlotWrapper?: ComponentType<any>;
        toolbar?: ComponentType<any>;
        agenda?: {
          date?: ComponentType<any>;
          time?: ComponentType<any>;
          event?: ComponentType<any>;
        };
        day?: {
          header?: ComponentType<any>;
          event?: ComponentType<any>;
        };
        week?: {
          header?: ComponentType<any>;
          event?: ComponentType<any>;
        };
        month?: {
          header?: ComponentType<any>;
          dateHeader?: ComponentType<any>;
          event?: ComponentType<any>;
        };
      };
      formats?: {
        dateFormat?: string | ((date: Date, culture?: string, localizer?: any) => string);
        dayFormat?: string | ((date: Date, culture?: string, localizer?: any) => string);
        weekdayFormat?: string | ((date: Date, culture?: string, localizer?: any) => string);
        timeGutterFormat?: string | ((date: Date, culture?: string, localizer?: any) => string);
        monthHeaderFormat?: string | ((date: Date, culture?: string, localizer?: any) => string);
        dayHeaderFormat?: string | ((date: Date, culture?: string, localizer?: any) => string);
        dayRangeHeaderFormat?: string | ((range: { start: Date; end: Date }, culture?: string, localizer?: any) => string);
        agendaHeaderFormat?: string | ((range: { start: Date; end: Date }, culture?: string, localizer?: any) => string);
        selectRangeFormat?: string | ((range: { start: Date; end: Date }, culture?: string, localizer?: any) => string);
        agendaDateFormat?: string | ((date: Date, culture?: string, localizer?: any) => string);
        agendaTimeFormat?: string | ((date: Date, culture?: string, localizer?: any) => string);
        agendaTimeRangeFormat?: string | ((range: { start: Date; end: Date }, culture?: string, localizer?: any) => string);
        eventTimeRangeFormat?: string | ((range: { start: Date; end: Date }, culture?: string, localizer?: any) => string);
        eventTimeRangeStartFormat?: string | ((range: { start: Date; end: Date }, culture?: string, localizer?: any) => string);
        eventTimeRangeEndFormat?: string | ((range: { start: Date; end: Date }, culture?: string, localizer?: any) => string);
      };
      messages?: {
        allDay?: ReactNode;
        previous?: ReactNode;
        next?: ReactNode;
        today?: ReactNode;
        month?: ReactNode;
        week?: ReactNode;
        day?: ReactNode;
        agenda?: ReactNode;
        date?: ReactNode;
        time?: ReactNode;
        event?: ReactNode;
        showMore?: (count: number) => ReactNode;
        noEventsInRange?: ReactNode;
      };
      rtl?: boolean;
      eventPropGetter?: (
        event: Event,
        start: Date,
        end: Date,
        isSelected: boolean
      ) => React.HTMLAttributes<HTMLDivElement>;
      slotPropGetter?: (date: Date) => React.HTMLAttributes<HTMLDivElement>;
      dayPropGetter?: (date: Date) => React.HTMLAttributes<HTMLDivElement>;
      titleAccessor?: (event: Event) => string;
      tooltipAccessor?: (event: Event) => string;
      allDayAccessor?: (event: Event) => boolean;
      startAccessor?: (event: Event) => Date;
      endAccessor?: (event: Event) => Date;
      resourceAccessor?: (event: Event) => any;
      resourceIdAccessor?: (resource: any) => any;
      resourceTitleAccessor?: (resource: any) => string;
      views?: any;
      defaultView?: string;
      view?: string;
      date?: Date;
      getNow?: () => Date;
      onNavigate?: (newDate: Date, view: string, action: string) => void;
      onView?: (view: string) => void;
      onDrillDown?: (date: Date, view: string) => void;
      onSelectSlot?: (slotInfo: any) => void;
      onSelectEvent?: (event: Event, e: React.SyntheticEvent<HTMLElement>) => void;
      onDoubleClickEvent?: (event: Event, e: React.SyntheticEvent<HTMLElement>) => void;
      onKeyPressEvent?: (event: Event, e: React.SyntheticEvent<HTMLElement>) => void;
      onSelecting?: (range: { start: Date; end: Date }) => boolean | undefined;
      selected?: Event;
      defaultDate?: Date;
      scrollToTime?: Date;
      popup?: boolean;
      popupOffset?: number | { x: number; y: number };
      toolbar?: boolean;
      className?: string;
      elementProps?: React.HTMLAttributes<HTMLElement>;
      components?: {
        event?: ComponentType<any>;
        eventWrapper?: ComponentType<any>;
        dayWrapper?: ComponentType<any>;
        dateCellWrapper?: ComponentType<any>;
        timeSlotWrapper?: ComponentType<any>;
        toolbar?: ComponentType<any>;
        agenda?: {
          date?: ComponentType<any>;
          time?: ComponentType<any>;
          event?: ComponentType<any>;
        };
        day?: {
          header?: ComponentType<any>;
          event?: ComponentType<any>;
        };
        week?: {
          header?: ComponentType<any>;
          event?: ComponentType<any>;
        };
        month?: {
          header?: ComponentType<any>;
          dateHeader?: ComponentType<any>;
          event?: ComponentType<any>;
        };
      };
      formats?: {
        dateFormat?: string | ((date: Date, culture?: string, localizer?: any) => string);
        dayFormat?: string | ((date: Date, culture?: string, localizer?: any) => string);
        weekdayFormat?: string | ((date: Date, culture?: string, localizer?: any) => string);
        timeGutterFormat?: string | ((date: Date, culture?: string, localizer?: any) => string);
        monthHeaderFormat?: string | ((date: Date, culture?: string, localizer?: any) => string);
        dayHeaderFormat?: string | ((date: Date, culture?: string, localizer?: any) => string);
        dayRangeHeaderFormat?: string | ((range: { start: Date; end: Date }, culture?: string, localizer?: any) => string);
        agendaHeaderFormat?: string | ((range: { start: Date; end: Date }, culture?: string, localizer?: any) => string);
        selectRangeFormat?: string | ((range: { start: Date; end: Date }, culture?: string, localizer?: any) => string);
        agendaDateFormat?: string | ((date: Date, culture?: string, localizer?: any) => string);
        agendaTimeFormat?: string | ((date: Date, culture?: string, localizer?: any) => string);
        agendaTimeRangeFormat?: string | ((range: { start: Date; end: Date }, culture?: string, localizer?: any) => string);
        eventTimeRangeFormat?: string | ((range: { start: Date; end: Date }, culture?: string, localizer?: any) => string);
        eventTimeRangeStartFormat?: string | ((range: { start: Date; end: Date }, culture?: string, localizer?: any) => string);
        eventTimeRangeEndFormat?: string | ((range: { start: Date; end: Date }, culture?: string, localizer?: any) => string);
      };
      messages?: {
        allDay?: ReactNode;
        previous?: ReactNode;
        next?: ReactNode;
        today?: ReactNode;
        month?: ReactNode;
        week?: ReactNode;
        day?: ReactNode;
        agenda?: ReactNode;
        date?: ReactNode;
        time?: ReactNode;
        event?: ReactNode;
        showMore?: (count: number) => ReactNode;
        noEventsInRange?: ReactNode;
      };
      rtl?: boolean;
      eventPropGetter?: (
        event: Event,
        start: Date,
        end: Date,
        isSelected: boolean
      ) => React.HTMLAttributes<HTMLDivElement>;
      slotPropGetter?: (date: Date) => React.HTMLAttributes<HTMLDivElement>;
      dayPropGetter?: (date: Date) => React.HTMLAttributes<HTMLDivElement>;
      titleAccessor?: (event: Event) => string;
      tooltipAccessor?: (event: Event) => string;
      allDayAccessor?: (event: Event) => boolean;
      startAccessor?: (event: Event) => Date;
      endAccessor?: (event: Event) => Date;
      resourceAccessor?: (event: Event) => any;
      resourceIdAccessor?: (resource: any) => any;
      resourceTitleAccessor?: (resource: any) => string;
      views?: any;
      defaultView?: string;
      view?: string;
      date?: Date;
      getNow?: () => Date;
      onNavigate?: (newDate: Date, view: string, action: string) => void;
      onView?: (view: string) => void;
      onDrillDown?: (date: Date, view: string) => void;
      onSelectSlot?: (slotInfo: any) => void;
      onSelectEvent?: (event: Event, e: React.SyntheticEvent<HTMLElement>) => void;
      onDoubleClickEvent?: (event: Event, e: React.SyntheticEvent<HTMLElement>) => void;
      onKeyPressEvent?: (event: Event, e: React.SyntheticEvent<HTMLElement>) => void;
      onSelecting?: (range: { start: Date; end: Date }) => boolean | undefined;
      selected?: Event;
      defaultDate?: Date;
      scrollToTime?: Date;
      popup?: boolean;
      popupOffset?: number | { x: number; y: number };
      toolbar?: boolean;
      className?: string;
      elementProps?: React.HTMLAttributes<HTMLElement>;
    }
  
    export const Calendar: ComponentType<CalendarProps>;
    export const momentLocalizer: (momentInstance: any) => any;
  }
  