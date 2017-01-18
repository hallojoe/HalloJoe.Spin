using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Diagnostics;
using HalloJoe.Spin;

/*
    =HVIS(ER.FEJL(VOPSLAG(A1;Ark2!A:A;1; SAND);"Keep";"Delete")
*/

namespace UnitTestProject1
{
    [TestClass]
    public class UnitTest1
    {
        const string TEST_SPIN_TEXT = "{{Flyttefirma|Et flyttefirma} {og|samt|plus|&|+} {{mange|en masse|masser af|en {|hel|god|stor} del|adskillige|talrige|utallige|rigeligt med} møbler|{meget|en masse|masser af|en {|hel|god|stor} del|adskilligt|talrigt|utalligt|rigeligt med} inventar|{mange|en masse|masser af|en {|hel|god|stor} del|adskillige|talrige|utallige|rigeligt med} fyldte flyttekasser|{mange|en masse|masser af|en {|hel|god|stor} del|adskillige|talrige|utallige|rigeligt med} ejendele|{mange|en masse|masser af|en {|hel|god|stor} del|adskillige|talrige|utallige|rigeligt med} besiddelser|{meget|en masse|masser af|en {|hel|god|stor} del|adskilligt|talrigt|utalligt|rigeligt med} habengut|{mange|en masse|masser af|en {|hel|god|stor} del|adskillige|talrige|utallige|rigeligt med} ting og sager|{meget|en masse|masser af|en {|hel|god|stor} del|adskilligt|talrigt|utalligt|rigeligt med} gods}|{Vi|Min {kæreste|fyr} og jeg|Mig og min {kæreste|fyr}} har {taget kontakt til et|kontaktet et|ringet til et|lavet en aftale med et|bestilt tid hos et|fundet et godt|fået et godt tilbud fra et|fået gratis flyttekasser af et} flyttefirma|Et {{godt|glimrende|fortrinligt|fortræffeligt|uovertruffent|fremragende|udmærket|eminent|excellent|fint|fornemt|udsøgt} {og|samt|plus|&|+} {|pris}billigt|{|pris}billigt {og|samt|plus|&|+} {godt|glimrende|fortrinligt|fortræffeligt|uovertruffent|fremragende|udmærket|eminent|excellent|fint|fornemt|udsøgt}} flyttefirma}";

        internal void WriteSpinTextStats()
        {
            var spinner = new TextSpinner(TEST_SPIN_TEXT);
            WriteSpinTextStats(ref spinner);
        }

        internal void WriteSpinTextStats(ref TextSpinner spinner)
        {
            Debug.WriteLine("variants " + spinner.CountVariants().ToString());
            Debug.WriteLine("min word count " + spinner.CountMinWords().ToString());
            Debug.WriteLine("max word count " + spinner.CountMaxWords().ToString());
            Debug.WriteLine(" ");
        }

        [TestMethod]
        public void Test_Make_100_Texts_With_Same_Spinner()
        {
            var spinner = new TextSpinner(TEST_SPIN_TEXT);
            WriteSpinTextStats(ref spinner);           
            for (var i = 1; i <= 200; i++)
            {
                Debug.WriteLine(spinner.ToString());
            }
            Assert.AreEqual(0, 0);
        }

        [TestMethod]
        public void Test_Make_1000_Texts_With_Same_Spinner_Trying_To_Get_As_Many_Texts_As_Requested()
        {
            // a loss between 50% and 10% percent has been observed using the current rnd(.net) algo
            // in order to get what we want we need to gear amount of produced strings 
            var spinner = new TextSpinner(TEST_SPIN_TEXT);
            var gear = 50;
            WriteSpinTextStats(ref spinner);
            var list = new List<string>();
            for (var i = 1; i <= spinner.CountVariants() * gear; i++)
            {
                list.Add(spinner.ToString());
            }
            list = list.Distinct().ToList();
            Debug.WriteLine(list.Count);
            foreach (var item in list.Take(1000))
            {
                Debug.WriteLine(item);
            }
            Assert.AreEqual(0, 0);
        }


        [TestMethod]
        public void Test_Make_100_Texts_With_Newed_Spinner_And_Stats()
        {
            WriteSpinTextStats();                            
            for (var i = 1; i <= 100; i++)
            {
                var rnd = new Random((TEST_SPIN_TEXT + i.ToString()).GetHashCode());
                Debug.WriteLine(new TextSpinner(TEST_SPIN_TEXT, rnd).ToString());
            }
            Assert.AreEqual(0, 0);
        }

        [TestMethod]
        public void Test_Make_100_Texts_With_Newed_Spinner()
        {
            for (var i = 1; i <= 100; i++)
            {
                var rnd = new Random((TEST_SPIN_TEXT + i.ToString()).GetHashCode());
                Debug.WriteLine(new TextSpinner(TEST_SPIN_TEXT, rnd).ToString());
            }
            Assert.AreEqual(0, 0);
        }

        /// <summary>
        /// instantiate new TextSpinner for each spin 
        /// </summary>
        [TestMethod]
        public void Test_Initialized_Spin_Method_Return_Always_Same_Result()
        {
            var spinHash = TEST_SPIN_TEXT.GetHashCode();

            var spinner = new TextSpinner(TEST_SPIN_TEXT, new Random(spinHash));

            Debug.WriteLine($"{ nameof(spinHash)}: { spinHash }");
            Debug.WriteLine($"{ nameof(TEST_SPIN_TEXT)}: { TEST_SPIN_TEXT }");

            var one = spinner.ToString();
            Debug.WriteLine($"{ nameof(one)}: { one }");

            spinner = new TextSpinner(TEST_SPIN_TEXT, new Random(spinHash));

            var two = TextSpinner.Spin(TEST_SPIN_TEXT, new Random(spinHash));
            Debug.WriteLine($"{ nameof(two)}: { two }");

            spinner = new TextSpinner(TEST_SPIN_TEXT, new Random(spinHash));

            var three = TextSpinner.Spin(TEST_SPIN_TEXT, new Random(spinHash));
            Debug.WriteLine($"{ nameof(three)}: { three }");

            Assert.AreEqual(one, two, "One and two matched");
            Assert.AreEqual(one, three, "One and three matched");
            Assert.AreEqual(two, three, "Two and three matched");

            Debug.WriteLine("Perfect, all are equal.");
        }

        /// <summary>
        /// use static method for each spin
        /// </summary>
        [TestMethod]
        public void Test_Static_Spin_Method_Return_Always_Same_Result()
        {
            var spinText = TEST_SPIN_TEXT; // "{The {dog|cat|fox} ran {fast|slow} to the {mall|store}|The {dog|cat|fox} {drove|did drive} {the|a} {car|truck} to the {mall|store|shopping center}}";
            var spinHash = spinText.GetHashCode();

            Debug.WriteLine($"{ nameof(spinHash)}: { spinHash }");
            Debug.WriteLine($"{ nameof(spinText)}: { spinText }");

            var one = TextSpinner.Spin(spinText, new Random(spinHash));
            Debug.WriteLine($"{ nameof(one)}: { one }");

            var two = TextSpinner.Spin(spinText, new Random(spinHash));
            Debug.WriteLine($"{ nameof(two)}: { two }");

            var three = TextSpinner.Spin(spinText, new Random(spinHash));
            Debug.WriteLine($"{ nameof(three)}: { three }");

            Assert.AreEqual(one, two, "One and two matched");
            Assert.AreEqual(one, three, "One and three matched");
            Assert.AreEqual(two, three, "Two and three matched");

            Debug.WriteLine("Perfect, all are equal.");
        }
    }
}
