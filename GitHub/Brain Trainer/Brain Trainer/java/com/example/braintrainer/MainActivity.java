package com.example.braintrainer;

import androidx.appcompat.app.AppCompatActivity;

import android.media.MediaPlayer;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.Random;

public class MainActivity extends AppCompatActivity {

    TextView timerTextView, gameOverTextView, firstBlockText, secondBlockText, thirdBlockText, fourthBlockText, taskTextView, resultTextView;
    Button playAgainButton, startButton;
    ArrayList<Integer> answers;
    int locationOfCorrectAnswer;
    Random random;
    int score;
    int wrong;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        timerTextView = (TextView) findViewById(R.id.timerTextView);
        taskTextView = (TextView) findViewById(R.id.taskTextView);
        resultTextView = (TextView) findViewById(R.id.resultTextView);

        firstBlockText = (TextView) findViewById(R.id.firstTextView);
        secondBlockText = (TextView) findViewById(R.id.secondTextView);
        thirdBlockText = (TextView) findViewById(R.id.thirdTextView);
        fourthBlockText = (TextView) findViewById(R.id.fourthTextView);

        startButton = (Button) findViewById(R.id.startButton);
        gameOverTextView = (TextView) findViewById(R.id.gameOverTextView);
        playAgainButton = (Button) findViewById(R.id.playAgainButton);

        answers = new ArrayList<>();
    }

    public void timer() {
        new CountDownTimer(30100, 1000) {
            @Override
            public void onTick(long l) {
                int time = (int) l / 1000;
                timerTextView.setText(time + "s");
            }

            @Override
            public void onFinish() {
                timerTextView.setText("0s");
                taskTextView.setText("-");
                resultTextView.setText("0/0");

                firstBlockText.setText("-");
                secondBlockText.setText("-");
                thirdBlockText.setText("-");
                fourthBlockText.setText("-");

                playAgainButton.setVisibility(View.VISIBLE);

                if (score > wrong) {
                    gameOverTextView.setText("YOU WIN!");
                } else {
                    gameOverTextView.setText("YOU LOOSE!");
                }
            }
        }.start();
    }

    public void startButton(View view) {
        startButton.setVisibility(View.INVISIBLE);
        timer();
        gameLogic();
    }

    public void playAgain(View view) {
        gameOverTextView.setText("GO!");
        playAgainButton.setVisibility(View.INVISIBLE);
        timer();
        gameLogic();
    }

    public void chooseAnswer(View view) {

        resultTextView.setText(score + " / " + wrong);

        if (Integer.toString(locationOfCorrectAnswer).equals(view.getTag().toString())) {
            gameOverTextView.setText("Correct!");
            score++;
            resultTextView.setText(score + " / " + wrong);
            answers.clear();
            gameLogic();
        } else {
            wrong++;
            resultTextView.setText(score + " / " + wrong);
            gameOverTextView.setText("Wrong! :/");
        }
    }

    public int getRandomSign(int a, int b) {
        int num = random.nextInt(4);

        switch (num) {
            case 0:
                taskTextView.setText(a + " + " + b);
                num = a + b;
                break;
            case 1:
                taskTextView.setText(a + " - " + b);
                if (a < b) {
                    taskTextView.setText(b + " - " + a);
                    num = b - a;
                } else {
                    taskTextView.setText(a + " - " + b);
                    num = a - b;
                }
                break;
            case 2:
                taskTextView.setText(a + " * " + b);
                num = a * b;
                break;
            case 3:
                if (a < b) {
                    taskTextView.setText(b + " / " + a);
                    num = b / a;
                } else {
                    taskTextView.setText(a + " / " + b);
                    num = a / b;
                }
                break;
        }
        return num;
    }

    public void gameLogic() {
        random = new Random();
        int a = random.nextInt(21)+1;
        int b = random.nextInt(21)+1;

        int rightAnswer = getRandomSign(a, b);

        // Right and wrong answers
        locationOfCorrectAnswer = random.nextInt(4) + 1;

        for (int i = 1; i < 5; i++) {
            if (i == locationOfCorrectAnswer) {
                answers.add(rightAnswer);
            } else {
                int wrongAnswer = random.nextInt(41) + 1;

                while (wrongAnswer == rightAnswer) {
                    wrongAnswer = random.nextInt(41) + 1;
                }
                answers.add(wrongAnswer);
            }
        }

        firstBlockText.setText(Integer.toString(answers.get(0)));
        secondBlockText.setText(Integer.toString(answers.get(1)));
        thirdBlockText.setText(Integer.toString(answers.get(2)));
        fourthBlockText.setText(Integer.toString(answers.get(3)));
    }
}
