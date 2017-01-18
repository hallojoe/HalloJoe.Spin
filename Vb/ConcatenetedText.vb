Imports System.Text

Namespace HalloJoe.Spin.Vb
    ''' <summary>
    ''' Represents a textpart which is a concatenation of contained textparts
    ''' </summary>
    ''' <remarks></remarks>
    Friend Class ConcatenetedText
        Inherits List(Of ITextPart)
        Implements ITextPart

        Public Overrides Function ToString() As String Implements ITextPart.ToString
            Dim sb As New StringBuilder()
            For Each tp As ITextPart In Me
                sb.Append(tp.ToString())
            Next
            Return sb.ToString()
        End Function

        Public Function ToStructuredString() As String Implements ITextPart.ToStructuredString
            Dim sb As New StringBuilder()
            For Each tp As ITextPart In Me
                sb.Append(tp.ToStructuredString()) ' almost the same to ToString() except this line
            Next
            Return sb.ToString()
        End Function

        Public Function CountVariants() As Decimal Implements ITextPart.CountVariants
            Dim res As Decimal = 1
            For Each tp As ITextPart In Me
                res *= tp.CountVariants()
            Next
            Return res
        End Function

        Public Function CountMinWords() As Integer Implements ITextPart.CountMinWords
            Return Me.Sum(Function(el) el.CountMinWords())
        End Function

        Public Function CountMaxWords() As Integer Implements ITextPart.CountMaxWords
            Return Me.Sum(Function(el) el.CountMaxWords())
        End Function

    End Class

End Namespace
