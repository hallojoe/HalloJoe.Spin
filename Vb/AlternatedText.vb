Imports System.Text

Namespace HalloJoe.Spin.Vb

    ''' <summary>
    ''' Represents a textpart which is [random] one among its contained textparts
    ''' </summary>
    ''' <remarks></remarks>
    Friend Class AlternatedText
        Inherits List(Of ITextPart)
        Implements ITextPart

        Private _rnd As Random

        ''' <summary>
        ''' Constructor that creates random-generator itself
        ''' </summary>
        ''' <remarks></remarks>
        Public Sub New()
            _rnd = New Random()
        End Sub

        ''' <summary>
        ''' Constructor that uses provided random generator
        ''' </summary>
        ''' <param name="rnd"></param>
        ''' <remarks></remarks>
        Public Sub New(ByVal rnd As Random)
            _rnd = rnd
        End Sub

        Public Overrides Function ToString() As String Implements ITextPart.ToString
            ' nothing to choose from ? then return empty string
            If Me.Count = 0 Then Return String.Empty
            Dim chosedIdx As Integer = _rnd.Next(Me.Count) ' index of the item to return
            Return Me(chosedIdx).ToString()
        End Function

        Public Function ToStructuredString() As String Implements ITextPart.ToStructuredString
            Dim sb As New StringBuilder()
            Dim first As Boolean = True
            sb.Append("{") ' opening bracket
            For Each el As ITextPart In Me
                If first Then
                    first = False
                Else
                    sb.Append("|")
                End If
                sb.Append(el.ToStructuredString())
            Next
            sb.Append("}") ' closing bracket
            Return sb.ToString()
        End Function

        Public Function CountVariants() As Decimal Implements ITextPart.CountVariants
            Dim res As Decimal = 0
            For Each tp As ITextPart In Me
                res += tp.CountVariants()
            Next
            Return res
        End Function

        Public Function CountMinWords() As Integer Implements ITextPart.CountMinWords
            Return Me.Min(Function(x) x.CountMinWords())
        End Function

        Public Function CountMaxWords() As Integer Implements ITextPart.CountMaxWords
            Return Me.Max(Function(x) x.CountMaxWords())
        End Function

    End Class

End Namespace
