"""Negative checks for the migration specification's publication safeguards."""
import importlib.util
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("validator", ROOT / "scripts/validate-locale-parity.py")
validator = importlib.util.module_from_spec(spec)
spec.loader.exec_module(validator)


class PreparationSafeguards(unittest.TestCase):
    def setUp(self):
        self.catalog = json.loads((ROOT / "docs/locale-parity/page-catalog.json").read_text())
        self.contracts = json.loads((ROOT / "docs/locale-parity/template-contracts.json").read_text())

    def test_complete_preparation(self):
        result = validator.validate(self.catalog, self.contracts)
        self.assertEqual(result["translationsMissing"], 184)
        self.assertFalse(result["productionChanged"])

    def test_pending_translation_cannot_be_approved(self):
        self.catalog["pages"][0]["locales"]["en"]["translationApproved"] = True
        with self.assertRaisesRegex(ValueError, "declared approved"):
            validator.validate(self.catalog, self.contracts)

    def test_target_collision_rejected(self):
        self.catalog["pages"][1]["locales"]["en"]["targetPath"] = "/en"
        self.catalog["pages"][1]["locales"]["en"]["publishedAtTarget"] = False
        with self.assertRaisesRegex(ValueError, "collision"):
            validator.validate(self.catalog, self.contracts)

    def test_french_url_not_migrated(self):
        self.catalog["pages"][1]["locales"]["fr"]["targetPath"] = "/autre-daf"
        with self.assertRaisesRegex(ValueError, "FR URL migration"):
            validator.validate(self.catalog, self.contracts)

    def test_missing_locale_rejected(self):
        del self.catalog["pages"][0]["locales"]["es"]
        with self.assertRaisesRegex(ValueError, "Missing locale"):
            validator.validate(self.catalog, self.contracts)

    def test_false_current_page_rejected(self):
        pending = next(p["locales"]["en"] for p in self.catalog["pages"] if p["locales"]["en"]["state"] == "translate-new")
        pending["mainWords"] = 800
        with self.assertRaisesRegex(ValueError, "Fabricated current"):
            validator.validate(self.catalog, self.contracts)

    def test_redirect_release_gate_required(self):
        self.catalog["proposedRedirects"][0]["activateOnlyAfter"] = ""
        with self.assertRaisesRegex(ValueError, "release gate"):
            validator.validate(self.catalog, self.contracts)

    def test_redirect_loop_rejected(self):
        rule = self.catalog["proposedRedirects"][0]
        rule["destination"] = rule["source"]
        with self.assertRaises(ValueError):
            validator.validate(self.catalog, self.contracts)

    def test_missing_family_rejected(self):
        self.contracts["families"].pop()
        with self.assertRaisesRegex(ValueError, "Family contract missing"):
            validator.validate(self.catalog, self.contracts)

    def test_wrong_count_rejected(self):
        self.catalog["counts"]["newTranslations"]["es"] = 91
        with self.assertRaisesRegex(ValueError, "missing translation count"):
            validator.validate(self.catalog, self.contracts)


if __name__ == "__main__":
    unittest.main()
