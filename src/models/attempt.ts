export interface Attempt {
    id: number;
    exam_id: number;
    student_id: number;
    score: number | null;
    submitted_at: Date | null;
}