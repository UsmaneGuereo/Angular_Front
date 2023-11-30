import { Student } from '../models/student';
import { Ticket } from '../models/ticket';

const dateToday: Date = new Date();

export const TICKETS_MOCKED: Ticket[] = [
  {
    title: 'SI95 in London',
    description: '',
    date: dateToday,
    student: {
      id: 202302227,
      prenom: 'Adele',
      nom: 'McKELLY'
    },
    major: 'SI',
    archived: false
  },
  {
    title: 'SI5 in Paris',
    description: 'Description du voyage',
    date: dateToday,
    student: {
      id: 202303894,
      prenom: 'Lionel',
      nom: 'MESSI'
    },
    major: 'GE',
    archived: false
  },
];

export const STUDENTS_MOCKED: Student[] = [
  {
    prenom: 'Adele',
    nom: 'McKELLY',
    id: 99
  },
  {
    prenom: 'Lionel',
    nom: 'MESSI',
    id: 10,
  },
]
