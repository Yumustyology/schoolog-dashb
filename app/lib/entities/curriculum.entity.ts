import { entity } from 'simpler-state';

export type Topic = {
	id: string;
	title: string;
	description?: string;
};

export type TermCurriculum = {
	id: string;
	label: string;
	topics: Topic[];
};

export type Curriculum = {
	source: 'manual' | 'waec' | 'neco' | 'subeb' | 'ube' | 'upload';
	terms: TermCurriculum[];
};

// Initialize with empty manual curriculum (3 terms)
const emptyCurriculum: Curriculum = {
	source: 'manual',
	terms: [
		{ id: 'first-term', label: 'First Term', topics: [] },
		{ id: 'second-term', label: 'Second Term', topics: [] },
		{ id: 'third-term', label: 'Third Term', topics: [] },
	],
};

export const curriculumState = entity<Curriculum>(emptyCurriculum);

export const setCurriculumSource = (source: Curriculum['source']) => {
	curriculumState.set((prev) => ({ ...prev, source }));
};

export const setCurriculum = (c: Curriculum) => {
	curriculumState.set(c);
};

export const addTopic = (termId: string, topic: Topic) => {
	curriculumState.set((prev) => ({
		...prev,
		terms: prev.terms.map((t) =>
			t.id === termId ? { ...t, topics: [...t.topics, topic] } : t
		),
	}));
};

export const removeTopic = (termId: string, topicId: string) => {
	curriculumState.set((prev) => ({
		...prev,
		terms: prev.terms.map((t) =>
			t.id === termId
				? { ...t, topics: t.topics.filter((tp) => tp.id !== topicId) }
				: t
		),
	}));
};

export const updateTopic = (
	termId: string,
	topicId: string,
	data: { title?: string; description?: string }
) => {
	curriculumState.set((prev) => ({
		...prev,
		terms: prev.terms.map((t) =>
			t.id === termId
				? {
						...t,
						topics: t.topics.map((tp) =>
							tp.id === topicId ? { ...tp, ...data } : tp
						),
					}
				: t
		),
	}));
};

// Prefill helpers for common curricula (dummy data)
export const prefillWaec = () => {
	const c: Curriculum = {
		source: 'waec',
		terms: [
			{
				id: 'first-term',
				label: 'First Term',
				topics: [
					{ id: 'waec-1', title: 'Introduction to WAEC Syllabus', description: 'Overview of WAEC topics' },
					{ id: 'waec-2', title: 'Core Practicals', description: 'Laboratory and practicals' },
				],
			},
			{
				id: 'second-term',
				label: 'Second Term',
				topics: [
					{ id: 'waec-3', title: 'Advanced Theory', description: 'Deeper concepts' },
				],
			},
			{ id: 'third-term', label: 'Third Term', topics: [] },
		],
	};
	setCurriculum(c);
};

// return a curriculum object (does not set global curriculum)
export const getWaecCurriculum = (): Curriculum => ({
	source: 'waec',
	terms: [
		{
			id: 'first-term',
			label: 'First Term',
			topics: [
				{ id: 'waec-1', title: 'Introduction to WAEC Syllabus', description: 'Overview of WAEC topics' },
				{ id: 'waec-2', title: 'Core Practicals', description: 'Laboratory and practicals' },
			],
		},
		{
			id: 'second-term',
			label: 'Second Term',
			topics: [{ id: 'waec-3', title: 'Advanced Theory', description: 'Deeper concepts' }],
		},
		{ id: 'third-term', label: 'Third Term', topics: [] },
	],
});

export const prefillNeco = () => {
	const c: Curriculum = {
		source: 'neco',
		terms: [
			{
				id: 'first-term',
				label: 'First Term',
				topics: [
					{ id: 'neco-1', title: 'NECO Basic Concepts', description: 'Overview NECO' },
				],
			},
			{ id: 'second-term', label: 'Second Term', topics: [] },
			{ id: 'third-term', label: 'Third Term', topics: [] },
		],
	};
	setCurriculum(c);
};

export const getNecoCurriculum = (): Curriculum => ({
	source: 'neco',
	terms: [
		{ id: 'first-term', label: 'First Term', topics: [{ id: 'neco-1', title: 'NECO Basic Concepts', description: 'Overview NECO' }] },
		{ id: 'second-term', label: 'Second Term', topics: [] },
		{ id: 'third-term', label: 'Third Term', topics: [] },
	],
});

export const prefillSubeb = () => {
	const c: Curriculum = {
		source: 'subeb',
		terms: [
			{
				id: 'first-term',
				label: 'First Term',
				topics: [
					{ id: 'subeb-1', title: 'SUBEB Orientation', description: 'SUBEB topics' },
				],
			},
			{ id: 'second-term', label: 'Second Term', topics: [] },
			{ id: 'third-term', label: 'Third Term', topics: [] },
		],
	};
	setCurriculum(c);
};

export const getSubebCurriculum = (): Curriculum => ({
	source: 'subeb',
	terms: [
		{ id: 'first-term', label: 'First Term', topics: [{ id: 'subeb-1', title: 'SUBEB Orientation', description: 'SUBEB topics' }] },
		{ id: 'second-term', label: 'Second Term', topics: [] },
		{ id: 'third-term', label: 'Third Term', topics: [] },
	],
});

export const prefillUbe = () => {
	const c: Curriculum = {
		source: 'ube',
		terms: [
			{
				id: 'first-term',
				label: 'First Term',
				topics: [
					{ id: 'ube-1', title: 'UBE Foundations', description: 'Universal basic education topics' },
				],
			},
			{ id: 'second-term', label: 'Second Term', topics: [] },
			{ id: 'third-term', label: 'Third Term', topics: [] },
		],
	};
	setCurriculum(c);
};

export const getUbeCurriculum = (): Curriculum => ({
	source: 'ube',
	terms: [
		{ id: 'first-term', label: 'First Term', topics: [{ id: 'ube-1', title: 'UBE Foundations', description: 'Universal basic education topics' }] },
		{ id: 'second-term', label: 'Second Term', topics: [] },
		{ id: 'third-term', label: 'Third Term', topics: [] },
	],
});
