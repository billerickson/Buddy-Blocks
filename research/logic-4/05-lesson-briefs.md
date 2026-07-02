# Logic - Level 4 Lesson Briefs

Sources: accepted level blueprint, course map, and unit design briefs in `research/logic-4/`.

## Unit 1: Symbolic Statements And Connectives

### Lesson 1: Propositions And Truth Claims

- **Teaching goal:** Help students distinguish propositions from questions, commands, fragments, and vague reactions.
- **Student outcome:** The student can identify whether a sentence makes a claim that can be true or false.
- **Key idea, model, or representation:** A proposition is a whole statement with a truth value, even if we do not yet know whether it is true.
- **Prerequisite knowledge:** Basic claim language, premise/conclusion exposure, and true/false vocabulary.
- **Likely misconceptions:** Treating every sentence as a proposition; rejecting claims when the truth is unknown; confusing personal preference with a truth-evaluable claim.
- **Evidence of mastery:** Given a mixed list, the student can classify propositions and explain the truth-claim feature.
- **Recommended question types:** `multiple-choice` for classification; `match-pairs` for sentence type to reason; `passage-question` for short contextual sorting.
- **Student-facing intro for `config.intro`:** Card 1: "A proposition is a statement that can be true or false. You may not know the answer yet, but the sentence still makes a claim." Card 2 bullets: "Proposition: The club meets on Friday. Not a proposition: Please close the door. Not a proposition: Is the club meeting?"
- **Reading-level and cognitive-load constraints:** Use one-sentence examples; avoid philosophical edge cases; keep "true or false" as the main test.

### Lesson 2: Statement Letters For Whole Claims

- **Teaching goal:** Teach statement letters as placeholders for entire propositions.
- **Student outcome:** The student can match `P` and `Q` to whole claims and translate between a key and a symbolic expression.
- **Key idea, model, or representation:** A statement letter stands for the whole claim listed in the key, not just one word from the sentence.
- **Prerequisite knowledge:** Propositions and truth claims from Lesson 1.
- **Likely misconceptions:** Treating `P` as the first letter of a topic word; changing the claim when rewriting; using one letter for two different claims in the same key.
- **Evidence of mastery:** The student can read a statement-letter key and choose the correct sentence for a symbolic form.
- **Recommended question types:** `match-pairs` for letters to claims; `multiple-choice` for whole-claim translation; `fill-blank` for simple statement keys.
- **Student-facing intro for `config.intro`:** Card 1: "Logic often uses letters to stand for whole statements. If the key says `P = The trail is open`, then `P` means that complete claim." Card 2: "Do not make `P` mean just one word like trail. Always check the key."
- **Reading-level and cognitive-load constraints:** Use only `P`, `Q`, and occasionally `R`; keep keys visible in prompts; avoid nested symbols.

### Lesson 3: Negation Changes The Claim

- **Teaching goal:** Introduce negation as denial of the whole proposition.
- **Student outcome:** The student can translate `not P` and identify which complete claim is being denied.
- **Key idea, model, or representation:** Negation changes the truth value of the whole statement: if `P` is true, `not P` is false; if `P` is false, `not P` is true.
- **Prerequisite knowledge:** Statement-letter keys and whole-claim representation.
- **Likely misconceptions:** Negating only one word; replacing a claim with an unrelated opposite; thinking `not P` means "I dislike P."
- **Evidence of mastery:** The student can match `not P` to an accurate denial and choose the truth value of a simple negation.
- **Recommended question types:** `multiple-choice` for accurate negations; `fill-blank` for "not" translations; `match-pairs` for claims to negations.
- **Student-facing intro for `config.intro`:** Card 1: "`not P` means the claim `P` is denied. If `P` means 'The light is on,' then `not P` means 'The light is not on.'" Card 2: "Negation is about the whole claim, not just a random opposite word."
- **Reading-level and cognitive-load constraints:** Avoid double negation in this lesson; use concrete claims with clear denial forms.

### Lesson 4: And, Or, And Inclusive Or

- **Teaching goal:** Teach conjunction and inclusive disjunction truth conditions.
- **Student outcome:** The student can translate `P and Q` and `P or Q`, and identify when each compound statement is true.
- **Key idea, model, or representation:** `P and Q` is true only when both parts are true; inclusive `P or Q` is true when at least one part is true, including both.
- **Prerequisite knowledge:** Statement keys, negation, and whole-claim translation.
- **Likely misconceptions:** Thinking `or` always means exactly one; treating `and` as true when only one part is true; ignoring the statement key.
- **Evidence of mastery:** The student can translate and evaluate simple `and` and inclusive `or` statements from given truth values.
- **Recommended question types:** `multiple-choice` for truth-condition checks; `match-pairs` for symbol to translation; `multi-blank-cloze` for truth-condition statements.
- **Student-facing intro for `config.intro`:** Card 1: "`P and Q` needs both statements. `P or Q` in logic usually means at least one statement, and it can include both." Card 2 bullets: "`P and Q`: both true. `P or Q`: P true, Q true, or both true."
- **Reading-level and cognitive-load constraints:** Keep to two statements; label inclusive `or` clearly; do not introduce exclusive-or notation.

## Unit 2: Conditionals, Truth Tables, And Validity

### Lesson 1: If Then And Its Parts

- **Teaching goal:** Teach the structure of conditional statements.
- **Student outcome:** The student can identify antecedent and consequent and translate a simple conditional into `P -> Q`.
- **Key idea, model, or representation:** In `if P, then Q`, `P` is the antecedent and `Q` is the consequent.
- **Prerequisite knowledge:** Statement letters and simple symbolic translation.
- **Likely misconceptions:** Treating the first thing mentioned as always the cause; swapping antecedent and consequent; reading a conditional as proof that `P` happened.
- **Evidence of mastery:** The student can label parts of an if/then sentence and choose the correct symbolic form.
- **Recommended question types:** `fill-blank` for antecedent/consequent labels; `multiple-choice` for symbolic translation; `match-pairs` for conditional parts.
- **Student-facing intro for `config.intro`:** Card 1: "A conditional has two parts: `if P, then Q`. The `if` part is the antecedent. The `then` part is the consequent." Card 2: "Example: If the password is correct, then the page opens. Antecedent: the password is correct. Consequent: the page opens."
- **Reading-level and cognitive-load constraints:** Use direct if/then wording before varied sentence order; avoid necessary/sufficient terminology except as teacher background.

### Lesson 2: The Converse Trap

- **Teaching goal:** Help students avoid reversing a conditional.
- **Student outcome:** The student can distinguish `if P then Q` from the converse `if Q then P`.
- **Key idea, model, or representation:** The converse switches the antecedent and consequent, and it may be false even when the original conditional is true.
- **Prerequisite knowledge:** Antecedent, consequent, and `P -> Q` translation.
- **Likely misconceptions:** Assuming a rule works backward; treating evidence for `Q` as proof of `P`; thinking swapped statements always have the same truth value.
- **Evidence of mastery:** The student can identify the converse and choose a scenario that shows it does not necessarily follow.
- **Recommended question types:** `multiple-choice` for converse identification; `order-items` for conditional part order; `passage-question` for short rule examples.
- **Student-facing intro for `config.intro`:** Card 1: "The converse of `if P, then Q` is `if Q, then P`. It is a different claim." Card 2: "If something is a square, then it is a rectangle. The converse says: if something is a rectangle, then it is a square. That does not always work."
- **Reading-level and cognitive-load constraints:** Use familiar categories and rules; avoid biconditionals; keep examples nontricky.

### Lesson 3: Truth Tables For Connectives

- **Teaching goal:** Teach truth rows for `not`, `and`, `or`, and `if...then`.
- **Student outcome:** The student can complete simple truth-table values for basic connectives.
- **Key idea, model, or representation:** A truth table checks every possible combination of truth values for the statement letters.
- **Prerequisite knowledge:** Unit 1 connectives, conditional parts, and true/false values.
- **Likely misconceptions:** Treating `or` as exclusive; making `and` true with one true part; making every conditional with a false antecedent false.
- **Evidence of mastery:** The student can complete truth values in a row or small table for a given connective.
- **Recommended question types:** `multi-blank-cloze` for row completion; `multiple-choice` for truth-condition rules; `match-pairs` for connective to condition.
- **Student-facing intro for `config.intro`:** Card 1: "A truth table lists possible true/false cases. For each row, ask what the compound statement would be." Card 2 bullets: "`not P` flips P. `P and Q` needs both. `P or Q` needs at least one. `if P then Q` fails only when P is true and Q is false."
- **Reading-level and cognitive-load constraints:** Use T/F labels consistently; begin with one row at a time; avoid three-variable tables.

### Lesson 4: Valid Or Invalid By Truth Table

- **Teaching goal:** Use truth-table rows to test simple argument validity.
- **Student outcome:** The student can decide whether an argument form is invalid by finding a row with true premises and a false conclusion.
- **Key idea, model, or representation:** A valid argument has no possible row where all premises are true and the conclusion is false.
- **Prerequisite knowledge:** Premise, conclusion, valid/invalid, and basic truth-table rows.
- **Likely misconceptions:** Judging validity by topic believability; checking only the conclusion column; thinking one true row proves validity.
- **Evidence of mastery:** The student can identify whether a marked truth-table row is a counterexample to validity.
- **Recommended question types:** `passage-question` for compact table scenarios; `multiple-choice` for counterexample rows; `match-pairs` for valid/invalid evidence.
- **Student-facing intro for `config.intro`:** Card 1: "Truth tables can test argument form. To show an argument is invalid, look for a row where the premises are true but the conclusion is false." Card 2: "If that row exists, the conclusion does not have to follow."
- **Reading-level and cognitive-load constraints:** Use one or two premises; present rows in text rather than dense full tables when possible; keep symbol load light.

## Unit 3: Deductive, Inductive, And Abductive Reasoning

### Lesson 1: Deduction And Must-Follow Support

- **Teaching goal:** Clarify deductive reasoning as support that aims to make the conclusion necessary.
- **Student outcome:** The student can recognize when a conclusion must follow from the premises if they are true.
- **Key idea, model, or representation:** Deduction asks, "Could the premises be true and the conclusion false?"
- **Prerequisite knowledge:** Validity and counterexample rows from Unit 2.
- **Likely misconceptions:** Calling any formal-sounding argument deductive; confusing factual truth with must-follow structure; ignoring a possible counterexample.
- **Evidence of mastery:** The student can classify a simple deductive argument and choose whether a counterexample is possible.
- **Recommended question types:** `multiple-choice` for must-follow checks; `passage-question` for short arguments; `order-items` for premise-to-conclusion reasoning steps.
- **Student-facing intro for `config.intro`:** Card 1: "Deductive reasoning tries to guarantee the conclusion. If the premises are true, the conclusion must be true." Card 2: "Ask: can the premises be true while the conclusion is false? If yes, the argument is not deductively valid."
- **Reading-level and cognitive-load constraints:** Use short arguments with clear premises; avoid controversial or background-heavy topics.

### Lesson 2: Induction And Strong Patterns

- **Teaching goal:** Teach inductive reasoning as pattern or evidence support that can be strong without being guaranteed.
- **Student outcome:** The student can judge whether evidence makes a conclusion likely and identify what would strengthen it.
- **Key idea, model, or representation:** Induction moves from examples or observations to a likely conclusion; more relevant and representative evidence usually makes it stronger.
- **Prerequisite knowledge:** Deductive support and basic evidence language.
- **Likely misconceptions:** Treating induction as a wild guess; treating one example as enough for a broad claim; demanding certainty from every good argument.
- **Evidence of mastery:** The student can classify inductive reasoning and choose stronger or weaker evidence for a claim.
- **Recommended question types:** `passage-question` for evidence scenarios; `multiple-choice` for strength judgments; `match-pairs` for evidence quality labels.
- **Student-facing intro for `config.intro`:** Card 1: "Inductive reasoning uses observations or patterns to support a likely conclusion. It does not guarantee the conclusion." Card 2: "A bigger, more representative set of evidence usually supports a stronger inductive claim."
- **Reading-level and cognitive-load constraints:** Keep samples and patterns small; do not require statistical calculation.

### Lesson 3: Abduction And Best Explanations

- **Teaching goal:** Teach abductive reasoning as choosing the best current explanation for evidence.
- **Student outcome:** The student can compare possible explanations and choose the one that best fits the available clues.
- **Key idea, model, or representation:** Abduction asks which explanation best accounts for the evidence, while staying open to new evidence.
- **Prerequisite knowledge:** Evidence, alternatives, and induction limits.
- **Likely misconceptions:** Treating the first explanation as proven; ignoring alternative explanations; choosing the most dramatic explanation over the best-supported one.
- **Evidence of mastery:** The student can identify an abductive argument and select the explanation that fits all listed evidence best.
- **Recommended question types:** `passage-question` for clue scenarios; `multiple-choice` for best-explanation selection; `match-pairs` for clue to explanation support.
- **Student-facing intro for `config.intro`:** Card 1: "Abductive reasoning looks for the best explanation of clues. It is useful, but it can change if new evidence appears." Card 2: "A good explanation fits the clues better than the alternatives."
- **Reading-level and cognitive-load constraints:** Use two or three clues; limit alternatives to plausible, age-appropriate explanations.

### Lesson 4: Choosing The Right Support Test

- **Teaching goal:** Help students select the right evaluation question for deductive, inductive, or abductive reasoning.
- **Student outcome:** The student can match a claim to its support type and revise overstrong wording.
- **Key idea, model, or representation:** Different reasoning types need different tests: must follow, likely from evidence, or best explanation.
- **Prerequisite knowledge:** Deductive, inductive, and abductive definitions.
- **Likely misconceptions:** Using "prove" for every kind of support; calling weak evidence deductive; rejecting a claim instead of revising its strength.
- **Evidence of mastery:** The student can choose the right support test and select a careful conclusion.
- **Recommended question types:** `match-pairs` for type to test; `multiple-choice` for careful revisions; `passage-question` for mixed support classification.
- **Student-facing intro for `config.intro`:** Card 1: "Before judging an argument, ask what kind of support it is trying to give." Card 2 bullets: "Deductive: must it follow? Inductive: how strong is the pattern? Abductive: what best explains the evidence?"
- **Reading-level and cognitive-load constraints:** Use brief passages; keep labels available; focus on one revision decision at a time.

## Unit 4: Data, Probability, And Cause Claims

### Lesson 1: Samples And Scope

- **Teaching goal:** Teach students to connect a sample to the group it can reasonably represent.
- **Student outcome:** The student can identify when a sample is too narrow or biased for a broad conclusion.
- **Key idea, model, or representation:** A sample supports claims about a population only when it represents that population well enough.
- **Prerequisite knowledge:** Inductive reasoning and evidence strength.
- **Likely misconceptions:** Generalizing from one small group to everyone; ignoring who was asked; treating a large number as representative without context.
- **Evidence of mastery:** The student can choose a claim whose scope matches the sample.
- **Recommended question types:** `passage-question` for survey scenarios; `multiple-choice` for scope judgments; `match-pairs` for sample to fair claim.
- **Student-facing intro for `config.intro`:** Card 1: "A sample is the group actually observed or asked. A careful claim should match that sample." Card 2: "If only twenty soccer players answered a survey, the results may tell us about those players, not every student."
- **Reading-level and cognitive-load constraints:** Avoid formal statistics; use familiar survey contexts; keep population/sample wording explicit.

### Lesson 2: Graphs, Trends, And Scale

- **Teaching goal:** Teach students to inspect graph evidence before accepting a caption or claim.
- **Student outcome:** The student can identify a trend, notice scale effects, and choose a conclusion supported by the graph description.
- **Key idea, model, or representation:** Graphs show data patterns, but scale, labels, and selected time spans affect what can be concluded.
- **Prerequisite knowledge:** Inductive reasoning, basic graph reading, and careful-claim language.
- **Likely misconceptions:** Trusting the caption without checking data; ignoring the graph scale; treating a small change as dramatic because it looks tall.
- **Evidence of mastery:** The student can choose a supported trend statement and reject overclaims from a graph description.
- **Recommended question types:** `passage-question` for text-described graphs; `multiple-choice` for supported claim; `fill-blank` for trend vocabulary.
- **Student-facing intro for `config.intro`:** Card 1: "Before accepting a graph claim, check the labels, scale, and pattern. Ask what the graph actually shows." Card 2: "A graph can show an increase or decrease without proving why it happened."
- **Reading-level and cognitive-load constraints:** Use simple graph descriptions rather than image-dependent tasks; avoid arithmetic beyond comparing values.

### Lesson 3: Probability Words And Careful Predictions

- **Teaching goal:** Teach probability language as degrees of likelihood rather than guarantees.
- **Student outcome:** The student can interpret certain, impossible, likely, unlikely, possible, and equal chance in short scenarios.
- **Key idea, model, or representation:** Probability words describe how expected an outcome is, not a promise about what must happen.
- **Prerequisite knowledge:** Inductive evidence and basic fraction or chance language.
- **Likely misconceptions:** Reading "likely" as certain; treating one surprising result as proof the probability word was wrong; confusing possible with likely.
- **Evidence of mastery:** The student can choose the probability word that fits a scenario and revise overcertain predictions.
- **Recommended question types:** `match-pairs` for probability words to meanings; `multiple-choice` for scenario classification; `fill-blank` for careful prediction language.
- **Student-facing intro for `config.intro`:** Card 1: "Probability words tell how likely something is. `Certain` means it must happen; `impossible` means it cannot happen; `likely` means it is expected but not guaranteed." Card 2: "A likely event can fail to happen once."
- **Reading-level and cognitive-load constraints:** Use simple chance contexts; avoid numeric probability calculations beyond obvious cases.

### Lesson 4: Correlation, Cause, And Overclaim

- **Teaching goal:** Teach students to distinguish related changes from proven causes.
- **Student outcome:** The student can identify a correlation claim and choose a careful conclusion that does not overstate causation.
- **Key idea, model, or representation:** Correlation means two things are related in the data; causation means one thing makes another happen, which needs stronger evidence.
- **Prerequisite knowledge:** Data trends, induction, and alternative explanations.
- **Likely misconceptions:** Correlation proves causation; every cause claim is false if not proven; an alternative explanation must be the true cause.
- **Evidence of mastery:** The student can revise a causal overclaim into a correlation or "needs more evidence" claim.
- **Recommended question types:** `passage-question` for data scenarios; `multiple-choice` for careful conclusion; `error-correction` for finite overclaim revisions.
- **Student-facing intro for `config.intro`:** Card 1: "When two things change together, they are correlated. That does not by itself prove one caused the other." Card 2: "A careful thinker asks: could there be another explanation? What evidence would test the cause?"
- **Reading-level and cognitive-load constraints:** Use nonpolitical examples; keep variables clear; enumerate accepted corrections for any error-correction item.

## Unit 5: Scientific Reasoning And Competing Explanations

### Lesson 1: Hypotheses, Evidence, And Conclusions

- **Teaching goal:** Teach students to sort the basic parts of a scientific explanation.
- **Student outcome:** The student can identify a hypothesis, evidence, observation, and conclusion in a short scenario.
- **Key idea, model, or representation:** A hypothesis is a testable explanation; evidence is what was observed or measured; a conclusion states what the evidence supports.
- **Prerequisite knowledge:** Abductive reasoning, evidence language, and data-claim caution.
- **Likely misconceptions:** Treating the hypothesis as the result; confusing observation with conclusion; thinking evidence always proves the hypothesis.
- **Evidence of mastery:** The student can label scenario parts and choose a conclusion that follows from evidence.
- **Recommended question types:** `match-pairs` for part labels; `passage-question` for science scenarios; `multiple-choice` for supported conclusion.
- **Student-facing intro for `config.intro`:** Card 1: "In science, a hypothesis is a testable explanation. Evidence is what was observed or measured. A conclusion says what the evidence supports." Card 2: "Keep those parts separate before judging the claim."
- **Reading-level and cognitive-load constraints:** Use short classroom-style experiments; avoid technical science vocabulary beyond the reasoning targets.

### Lesson 2: Alternative Explanations In Science

- **Teaching goal:** Teach students to look for other explanations that could fit the same evidence.
- **Student outcome:** The student can choose a plausible alternative explanation and explain why it matters.
- **Key idea, model, or representation:** Evidence can support a hypothesis while another explanation remains possible; stronger tests rule out alternatives.
- **Prerequisite knowledge:** Abduction, correlation/causation, and hypothesis/evidence vocabulary.
- **Likely misconceptions:** One explanation that fits must be true; any alternative destroys the original hypothesis; alternatives are just random guesses.
- **Evidence of mastery:** The student can identify an alternative that fits the evidence and choose a better test.
- **Recommended question types:** `passage-question` for competing explanations; `multiple-choice` for alternative selection; `match-pairs` for evidence to explanation limits.
- **Student-facing intro for `config.intro`:** Card 1: "A good scientific explanation should fit the evidence, but we also ask what else could explain the same evidence." Card 2: "An alternative explanation is strongest when it fits the clues and can be tested."
- **Reading-level and cognitive-load constraints:** Limit to two alternatives; avoid making the "wrong" alternative silly or obviously impossible.

### Lesson 3: Replication And Careful Conclusions

- **Teaching goal:** Show how repeated checks affect confidence in a scientific claim.
- **Student outcome:** The student can explain why repeated trials or replication strengthen a conclusion and choose careful wording.
- **Key idea, model, or representation:** Replication means checking whether results happen again; repeated support increases confidence but does not make careless overclaims acceptable.
- **Prerequisite knowledge:** Hypothesis/evidence/conclusion, alternative explanations, and probability language.
- **Likely misconceptions:** Repeating a test is needless if it worked once; one failed trial always disproves everything; repeated results prove no revision is ever possible.
- **Evidence of mastery:** The student can compare single-observation and repeated-check evidence and choose a careful conclusion.
- **Recommended question types:** `multiple-choice` for confidence judgments; `passage-question` for repeated-test scenarios; `order-items` for evidence-to-conclusion reasoning sequence.
- **Student-facing intro for `config.intro`:** Card 1: "Scientists often check results again. Replication asks whether a finding appears in another trial, group, or setting." Card 2: "Repeated evidence can make a conclusion stronger, but careful conclusions still match the evidence."
- **Reading-level and cognitive-load constraints:** Avoid advanced experimental design; use repeated-check language rather than technical methods.

## Unit 6: Argument Maps, Debate Cases, And Applied Analysis

### Lesson 1: Claims, Reasons, And Evidence In Maps

- **Teaching goal:** Teach the basic pieces of an argument map.
- **Student outcome:** The student can identify main claim, reason, and evidence in a short argument and place them in a simple map.
- **Key idea, model, or representation:** An argument map shows how reasons and evidence are supposed to support a main claim.
- **Prerequisite knowledge:** Premise/conclusion, evidence, and claim vocabulary.
- **Likely misconceptions:** Treating every sentence as a reason; confusing evidence with the main claim; mapping in reading order instead of support order.
- **Evidence of mastery:** The student can label map parts and choose the map that matches a short passage.
- **Recommended question types:** `passage-question` for argument passages; `match-pairs` for map part labels; `order-items` for support order.
- **Student-facing intro for `config.intro`:** Card 1: "An argument map makes support visible. Put the main claim at the top, then place reasons and evidence underneath." Card 2: "A reason tells why the claim should be accepted. Evidence is information used to support a reason or claim."
- **Reading-level and cognitive-load constraints:** Use three- to four-sentence arguments; avoid dense civic topics; keep maps textual.

### Lesson 2: Linked Reasons And Missing Assumptions

- **Teaching goal:** Teach students that some reasons work together and may depend on an unstated assumption.
- **Student outcome:** The student can identify linked reasons and choose the assumption that connects support to the claim.
- **Key idea, model, or representation:** Linked reasons support a claim together; a missing assumption is an unstated bridge the argument needs.
- **Prerequisite knowledge:** Claim/reason/evidence maps and premise/conclusion vocabulary.
- **Likely misconceptions:** Treating every reason as separate; ignoring the bridge between evidence and claim; selecting an assumption that only repeats the claim.
- **Evidence of mastery:** The student can complete a small argument map by adding the needed assumption.
- **Recommended question types:** `multiple-choice` for assumption selection; `match-pairs` for linked vs independent reasons; `passage-question` for map completion.
- **Student-facing intro for `config.intro`:** Card 1: "Sometimes two reasons work together. If one reason is missing, the support may fail." Card 2: "A missing assumption is an unstated idea the argument needs to connect the reasons to the claim."
- **Reading-level and cognitive-load constraints:** Keep assumptions concrete; avoid abstract policy arguments; use one missing bridge at a time.

### Lesson 3: Objections And Rebuttals

- **Teaching goal:** Teach targeted objections and rebuttals.
- **Student outcome:** The student can choose an objection that challenges a specific support link and a rebuttal that answers it.
- **Key idea, model, or representation:** A strong objection targets a reason, evidence, or assumption; a strong rebuttal responds to that target.
- **Prerequisite knowledge:** Argument-map parts and missing assumptions.
- **Likely misconceptions:** Treating any disagreement as an objection; rebutting by repeating the original claim; attacking a person or topic instead of the support.
- **Evidence of mastery:** The student can match objection/rebuttal pairs and select a fair response.
- **Recommended question types:** `match-pairs` for objection to target; `dialogue-builder` for choosing a fair next response; `multiple-choice` for best rebuttal.
- **Student-facing intro for `config.intro`:** Card 1: "An objection should aim at a specific part of the argument: a reason, evidence, or assumption." Card 2: "A rebuttal answers the objection. It should not just repeat the main claim louder."
- **Reading-level and cognitive-load constraints:** Use polite academic language; avoid ad hominem examples as funny distractors; keep exchanges short.

### Lesson 4: Debate Case Structure

- **Teaching goal:** Introduce the structure of a compact debate case.
- **Student outcome:** The student can identify claim, reasons, evidence, impact, objection, and rebuttal in a simple debate case.
- **Key idea, model, or representation:** A debate case organizes a position with reasons and evidence, explains why it matters, and responds to objections.
- **Prerequisite knowledge:** Argument maps, objections, rebuttals, and evidence quality.
- **Likely misconceptions:** Thinking a debate case is only opinion; treating impact as extra drama instead of the reason the issue matters; ignoring objections.
- **Evidence of mastery:** The student can label parts of a debate case and choose the response that addresses the opposing point.
- **Recommended question types:** `passage-question` for case analysis; `match-pairs` for part labels; `order-items` for case sequence.
- **Student-facing intro for `config.intro`:** Card 1: "A debate case usually has a claim, reasons, evidence, impact, and responses to objections." Card 2: "The impact explains why the claim matters. A rebuttal should answer the other side's point."
- **Reading-level and cognitive-load constraints:** Use nonpartisan school or community examples; keep the case short and balanced.

### Lesson 5: Applied Argument Analysis

- **Teaching goal:** Consolidate Logic 4 tools in short unfamiliar arguments.
- **Student outcome:** The student can choose the relevant logic tool and evaluate whether the conclusion fits the support.
- **Key idea, model, or representation:** Careful argument analysis asks which tool fits the problem: symbol check, truth-table validity, support type, data caution, science explanation, or argument map.
- **Prerequisite knowledge:** All prior Logic 4 units.
- **Likely misconceptions:** Using the newest tool for every argument; rejecting all imperfect arguments; accepting confident claims without checking support.
- **Evidence of mastery:** The student can identify the main reasoning issue and select a careful conclusion or revision.
- **Recommended question types:** `passage-question` for mixed argument analysis; `multiple-choice` for tool choice; `match-pairs` for issue to diagnostic question.
- **Student-facing intro for `config.intro`:** Card 1: "In this final lesson, choose the tool that fits the argument. Some arguments need a symbol check; others need a data, science, or map check." Card 2 bullets: "Ask: What is the claim? What support is offered? What would make the conclusion fair?"
- **Reading-level and cognitive-load constraints:** Keep passages short; avoid partisan contexts; make each item target one main reasoning issue even when it reviews several tools.
