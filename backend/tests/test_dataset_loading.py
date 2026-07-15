import os
import unittest

from chatbot import load_dataset


class DatasetLoadingTest(unittest.TestCase):
    def test_dataset_has_expected_columns(self):
        df = load_dataset()
        self.assertFalse(df.empty)
        self.assertIn("pertanyaan", df.columns)
        self.assertIn("jawaban", df.columns)
        self.assertIn("intent", df.columns)


if __name__ == "__main__":
    unittest.main()
