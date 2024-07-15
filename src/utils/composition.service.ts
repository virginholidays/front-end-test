import { PartyComposition } from '@/types/booking';
import { Parser, Result, Success, Failure, seqMap, string, regex, sepBy, of } from 'parsimmon';

const oneOrMoreAdults: Parser<number> = seqMap(string('a'), regex(/[1-9]{1}/), (_, a) => parseInt(a));
const childAges: Parser<number[]> = sepBy(
	seqMap(string('c'), regex(/((1{1}[0-7]{1})|[2-9])/), (_, age) => parseInt(age)),
	string(',')
);
const infants: Parser<number> = seqMap(string('i'), regex(/[0-9]{1}/), (_, i) => parseInt(i));

const roomParser: Parser<PartyComposition> = seqMap(
	oneOrMoreAdults,
	string(',').or(of(undefined)),
	childAges.or(of([])),
	string(',').or(of(undefined)),
	infants.or(of(0)),
	(a, _, ages, __, i) => ({
		adults: a,
		childAges: ages,
		infants: i
	})
);

const isSuccess = <T>(result: Success<T> | Failure): result is Success<T> => {
	return (result as Success<T>).value !== undefined;
};

const createParser = <T>(parser: Parser<T>): ((compositions: string[]) => T[] | undefined) => {
	return (composition: string[]): T[] | undefined => {
		if (composition == null) {
			return undefined;
		}
		return (composition || []).reduce((acc: T[] | undefined, next: string) => {
			if (acc == null) {
				return acc;
			}
			if (next == null || next === '') {
				return undefined;
			}
			const result: Result<T> = parser.parse(next);
			return isSuccess(result) ? acc.concat([result.value]) : undefined;
		}, [] as T[]);
	};
};

export namespace Rooms {
	export const parse: (compositions: string[]) => PartyComposition[] | undefined = createParser(roomParser);

	export const parseAndConvert: (compositions: string[]) => PartyComposition[] = (compositions: string[]) =>
		parse(compositions)?.map((room) => ({
			adults: room?.adults + (room?.childAges?.filter((age) => age >= 16)?.length ?? 0),
			childAges: room?.childAges?.map(c => c) ?? [],
			infants: room?.infants ?? 0
		})) || [];

	export const format: (compositions: PartyComposition[]) => string[] = (compositions: PartyComposition[]) =>
		compositions.map((composition) => {
			const childAges = composition.childAges.length > 0 ? `,c${composition.childAges.join(',c')}` : '';
			const infants = composition.infants > 0 ? `,i${composition.infants}` : '';
			return `a${composition.adults}${childAges}${infants}`;
		});

	export const prettyFormat = (composition: PartyComposition[]): string => {
		if (!composition) return '';

		const total = composition.reduce((acc, room) => acc + room.adults + room.childAges.length + room.infants, 0);
		return `${total} ${total > 1 ? 'people' : 'person'} / ${composition.length} ${composition.length > 1 ? 'rooms' : 'room'}`;
	};
}